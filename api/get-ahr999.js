export default async function handler(req, res) {
  try {
    // 1. 获取过去 200 天历史数据 (CoinGecko)
    const historyRes = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=200&interval=daily', {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (!historyRes.ok) throw new Error("CoinGecko API Error");
    
    const historyData = await historyRes.json();
    const prices = historyData.prices.map(item => item[1]);
    
    // 剔除最新一天未收盘数据，取前199天 + 今天实时作为参考
    const currentPrice = prices[prices.length - 1]; 
    
    // 2. 计算 Ahr999 (抄底指标)
    // 几何平均 (200日定投成本)
    let sumLog = 0;
    const days = 200;
    const recentPrices = prices.slice(-days); 
    recentPrices.forEach(p => sumLog += Math.log(p));
    const geometricMean = Math.exp(sumLog / recentPrices.length);

    // 指数增长估值
    const genesisDate = new Date('2009-01-03').getTime();
    const now = new Date().getTime();
    const coinAgeDays = (now - genesisDate) / (1000 * 60 * 60 * 24);
    const logAge = Math.log10(coinAgeDays);
    const expValuation = Math.pow(10, (5.84 * logAge - 17.0159));

    const ahr999 = (currentPrice / geometricMean) * (currentPrice / expValuation);

    // 3. 计算 Mayer Multiple (卖出参考指标 - 替代 MVRV-Z)
    // 逻辑：当前价格 / 200日移动平均线 (SMA)
    // 当 Mayer Multiple > 2.4 时，通常对应 MVRV-Z 的高风险区
    let sumPrice = 0;
    recentPrices.forEach(p => sumPrice += p);
    const sma200 = sumPrice / recentPrices.length;
    const mayerMultiple = currentPrice / sma200;

    // 4. 生成定投建议 (Buy Strategy)
    let buyStrategy = "hold"; // default
    let multiplier = 0;
    
    if (ahr999 <= 0.2) { multiplier = 16; buyStrategy = "all_in"; }
    else if (ahr999 <= 0.3) { multiplier = 8; buyStrategy = "heavy_buy"; }
    else if (ahr999 <= 0.45) { multiplier = 4; buyStrategy = "buy"; }
    else if (ahr999 <= 0.6) { multiplier = 2; buyStrategy = "light_buy"; }
    else if (ahr999 <= 0.8) { multiplier = 1; buyStrategy = "dca"; }
    else if (ahr999 <= 1.2) { multiplier = 0; buyStrategy = "hold"; }
    else { multiplier = 0; buyStrategy = "sell_zone"; }

    // 5. 生成卖出建议 (Sell Strategy based on Mayer)
    let sellSignal = "neutral";
    if (mayerMultiple > 2.4) sellSignal = "top_danger"; // 极度危险
    else if (mayerMultiple > 1.8) sellSignal = "high_risk"; // 风险高
    else if (mayerMultiple > 1.2) sellSignal = "elevated"; // 略高
    else sellSignal = "safe";

    res.status(200).json({
      price: currentPrice,
      ahr999: ahr999.toFixed(4),
      mayer: mayerMultiple.toFixed(2),
      buySignal: buyStrategy,
      sellSignal: sellSignal,
      multiplier: multiplier,
      updateTime: now
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true });
  }
}

export default async function handler(req, res) {
  try {
    // 1. 获取数据 (CoinGecko)
    const historyRes = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=200&interval=daily', {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (!historyRes.ok) throw new Error("CoinGecko API Error");
    
    const historyData = await historyRes.json();
    const prices = historyData.prices.map(item => item[1]);
    
    // 剔除最新一天未收盘数据，取前199天 + 今天实时作为参考
    const currentPrice = prices[prices.length - 1]; 
    
    // 2. 计算 Ahr999
    let sumLog = 0;
    const days = 200;
    const recentPrices = prices.slice(-days); 
    recentPrices.forEach(p => sumLog += Math.log(p));
    const geometricMean = Math.exp(sumLog / recentPrices.length);

    const genesisDate = new Date('2009-01-03').getTime();
    const now = new Date().getTime();
    const coinAgeDays = (now - genesisDate) / (1000 * 60 * 60 * 24);
    const logAge = Math.log10(coinAgeDays);
    const expValuation = Math.pow(10, (5.84 * logAge - 17.0159));

    const ahr999 = (currentPrice / geometricMean) * (currentPrice / expValuation);

    // 3. 计算卖出参考 (Mayer Multiple 作为 MVRV-Z 的免费替代)
    let sumPrice = 0;
    recentPrices.forEach(p => sumPrice += p);
    const sma200 = sumPrice / recentPrices.length;
    const mayerMultiple = currentPrice / sma200;

    // 4. 定义买入规则 (严格按照用户指令)
    let multiplier = 0;
    let frequency = "weekly"; // 默认周投
    let buySignal = "wait";

    // 频率判断：Ahr < 0.3 天投，否则周投
    if (ahr999 < 0.3) {
        frequency = "daily";
    } else {
        frequency = "weekly";
    }

    // 份数判断
    if (ahr999 > 1.2) {
        multiplier = 0;
        buySignal = "stop_high";
    } else if (ahr999 > 0.8 && ahr999 <= 1.2) {
        multiplier = 1; // 25
        buySignal = "buy_1";
    } else if (ahr999 > 0.6 && ahr999 <= 0.8) {
        multiplier = 2; // 50
        buySignal = "buy_2";
    } else if (ahr999 > 0.45 && ahr999 <= 0.6) {
        multiplier = 4; // 100
        buySignal = "buy_4";
    } else if (ahr999 > 0.3 && ahr999 <= 0.45) {
        multiplier = 8; // 200
        buySignal = "buy_8";
    } else if (ahr999 <= 0.3) {
        // Ahr < 0.3 (包含 < 0.2)
        multiplier = 16; // 400
        buySignal = "buy_16";
    }

    // 5. 定义卖出规则 (Sell > Buy, 卖出规则覆盖买入)
    // 参考 MVRV-Z 逻辑：Mayer > 2.4 视为极度危险，强制停止定投
    let sellSignal = "neutral";
    
    if (mayerMultiple > 2.4) {
        sellSignal = "top_danger"; // 对应 MVRV-Z > 7
        multiplier = 0; // 强制归零
        buySignal = "cant_buy_top";
    } else if (mayerMultiple > 1.8) {
        sellSignal = "high_risk"; // 对应 MVRV-Z > 3
        multiplier = 0; // 高风险区也建议停止定投
        buySignal = "cant_buy_risk";
    } else if (mayerMultiple > 1.3) {
        sellSignal = "elevated";
    } else {
        sellSignal = "safe";
    }

    res.status(200).json({
      price: currentPrice,
      ahr999: ahr999.toFixed(4),
      mayer: mayerMultiple.toFixed(2),
      buySignal: buySignal,
      sellSignal: sellSignal,
      multiplier: multiplier,
      frequency: frequency, // 返回频率
      updateTime: now
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true });
  }
}

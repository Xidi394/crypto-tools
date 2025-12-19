export default async function handler(req, res) {
  // 缓存控制：60秒内直接返回旧数据，防止接口超限
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');

  try {
    // 1. 获取 200 天历史数据 (用于计算平均成本)
    const historyRes = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=200&interval=daily', {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (!historyRes.ok) throw new Error("API Limit");
    
    const historyData = await historyRes.json();
    const prices = historyData.prices.map(item => item[1]);
    const currentPrice = prices[prices.length - 1]; 
    
    // 2. 计算 Ahr999 (几何平均)
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

    // 3. 计算 Mayer Multiple (作为 MVRV 的免费替代)
    // 说明：真实的 MVRV 需要链上数据(Realized Cap)，免费接口很难获取实时数据。
    // Mayer 倍数 (价格 / 200日均线) 是最接近的逃顶参考指标。
    let sumPrice = 0;
    recentPrices.forEach(p => sumPrice += p);
    const sma200 = sumPrice / recentPrices.length;
    const mayerMultiple = currentPrice / sma200;

    // 4. 买入策略 (严格按照你的指令)
    let multiplier = 0;
    let frequency = "weekly"; // 默认周投
    let buySignal = "wait";

    // 频率判断：Ahr < 0.3 天投
    if (ahr999 < 0.3) {
        frequency = "daily";
    } else {
        frequency = "weekly";
    }

    // 份数判断 (根据你的阶梯)
    if (ahr999 > 1.2) {
        multiplier = 0; 
        buySignal = "stop_high"; // 价格过高
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
        // 包含 < 0.2 的情况，都是 16 份
        multiplier = 16; 
        buySignal = "buy_16";
    }

    // 5. 卖出策略 (优先覆盖)
    // 参考逻辑：Mayer > 2.4 (约等于 MVRV > 3.7) 为极度危险
    let sellSignal = "safe";
    if (mayerMultiple > 2.4) {
        sellSignal = "top_danger"; // 逃顶
        multiplier = 0; // 强制停止定投
        buySignal = "cant_buy_top";
    } else if (mayerMultiple > 1.8) {
        sellSignal = "high_risk"; // 高风险
    } else if (mayerMultiple > 1.3) {
        sellSignal = "elevated"; // 预警
    }

    res.status(200).json({
      price: currentPrice,
      ahr999: ahr999.toFixed(4),
      mayer: mayerMultiple.toFixed(2), // 返回的是 Mayer 倍数
      buySignal: buySignal,
      sellSignal: sellSignal,
      multiplier: multiplier,
      frequency: frequency,
      updateTime: now
    });

  } catch (error) {
    console.error("API Error:", error);
    res.status(200).json({
      price: 0,
      ahr999: 0,
      error: true
    });
  }
}

export default async function handler(req, res) {
  // 【关键魔法】添加缓存控制头
  // s-maxage=60: 告诉 Vercel 服务器，这份数据在 60秒内是新鲜的，不用重新计算，直接把旧结果给用户。
  // stale-while-revalidate=30: 如果超过60秒一点点，先给旧数据，后台悄悄去更新。
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');

  try {
    // 1. 获取 CoinGecko 数据 (200天历史)
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

    // 3. 计算 Mayer Multiple (卖出参考)
    let sumPrice = 0;
    recentPrices.forEach(p => sumPrice += p);
    const sma200 = sumPrice / recentPrices.length;
    const mayerMultiple = currentPrice / sma200;

    // 4. 买入策略 (用户定义)
    let multiplier = 0;
    let frequency = "weekly";
    let buySignal = "wait";

    if (ahr999 < 0.3) frequency = "daily";
    else frequency = "weekly";

    if (ahr999 > 1.2) {
        multiplier = 0; buySignal = "stop_high";
    } else if (ahr999 > 0.8) {
        multiplier = 1; buySignal = "buy_1";
    } else if (ahr999 > 0.6) {
        multiplier = 2; buySignal = "buy_2";
    } else if (ahr999 > 0.45) {
        multiplier = 4; buySignal = "buy_4";
    } else if (ahr999 > 0.3) {
        multiplier = 8; buySignal = "buy_8";
    } else {
        multiplier = 16; buySignal = "buy_16";
    }

    // 5. 卖出策略 (优先覆盖)
    let sellSignal = "neutral";
    if (mayerMultiple > 2.4) {
        sellSignal = "top_danger";
        multiplier = 0; 
        buySignal = "cant_buy_top";
    } else if (mayerMultiple > 1.8) {
        sellSignal = "high_risk";
        multiplier = 0;
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
      frequency: frequency,
      updateTime: now
    });

  } catch (error) {
    console.error("API Error:", error);
    // 发生错误时，不要返回 500 崩溃，而是返回一个“维护中”的状态
    // 并且不再缓存错误结果，让下一次请求立即重试
    res.setHeader('Cache-Control', 'no-cache'); 
    res.status(200).json({
      price: 0,
      ahr999: 0,
      mayer: 0,
      buySignal: "stop_high", // 默认不买
      sellSignal: "neutral",
      multiplier: 0,
      frequency: "weekly",
      error: true
    });
  }
}

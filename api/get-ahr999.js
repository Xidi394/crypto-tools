export default async function handler(req, res) {
  try {
    // 1. 获取过去 200 天的比特币历史价格 (用于计算几何平均数)
    // 使用 CoinGecko 免费接口
    const historyRes = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=200&interval=daily', {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (!historyRes.ok) throw new Error("CoinGecko API 限制或错误");
    
    const historyData = await historyRes.json();
    const prices = historyData.prices.map(item => item[1]); // 提取价格数组
    const currentPrice = prices[prices.length - 1]; // 最新价格

    // 2. 计算【200日定投成本】(几何平均数)
    // 公式：(P1 * P2 * ... * P200)^(1/200)
    // 为了防止数值溢出，我们使用对数相加法: exp( (lnP1 + lnP2 + ...)/N )
    let sumLog = 0;
    const days = 200;
    // 取最近200天的数据（防止API返回多余数据）
    const recentPrices = prices.slice(-days); 
    
    recentPrices.forEach(p => {
        sumLog += Math.log(p);
    });
    const geometricMean = Math.exp(sumLog / recentPrices.length);

    // 3. 计算【指数增长估值】
    // 币龄 = 当前日期 - 创世区块日期(2009-01-03)
    const genesisDate = new Date('2009-01-03').getTime();
    const now = new Date().getTime();
    const coinAgeDays = (now - genesisDate) / (1000 * 60 * 60 * 24);
    
    // 拟合公式: 10 ^ (5.84 * log10(币龄) - 17.0159)
    const logAge = Math.log10(coinAgeDays);
    const expValuation = Math.pow(10, (5.84 * logAge - 17.0159));

    // 4. 计算最终 Ahr999 指数
    // Ahr999 = (现价 / 200日定投成本) * (现价 / 指数增长估值)
    const ahr999 = (currentPrice / geometricMean) * (currentPrice / expValuation);

    // 5. 根据你的策略生成建议
    let strategy = "暂停定投 (价格过高)";
    let multiplier = 0; // 份数
    let frequency = "周投"; // 默认周投

    const index = ahr999;

    // 频率判断
    if (index < 0.3) frequency = "天投 (机会难得)";
    else frequency = "周投";

    // 份数判断 (根据你的规则)
    if (index > 1.2) {
        multiplier = 0;
        strategy = "高估区域 - 停止买入";
    } else if (index > 0.8 && index <= 1.2) {
        multiplier = 1;
        strategy = "正常定投区";
    } else if (index > 0.6 && index <= 0.8) {
        multiplier = 2;
        strategy = "低估区 - 加倍买入";
    } else if (index > 0.45 && index <= 0.6) {
        multiplier = 4;
        strategy = "抄底区 - 4倍买入";
    } else if (index > 0.3 && index <= 0.45) {
        multiplier = 8;
        strategy = "极度低估 - 8倍买入";
    } else if (index <= 0.3) {
        multiplier = 16;
        strategy = "钻石底 - 16倍梭哈";
    }

    res.status(200).json({
      price: currentPrice,
      ahr999: ahr999.toFixed(4), // 保留4位小数更专业
      strategy: strategy,
      multiplier: multiplier,
      frequency: frequency,
      updateTime: new Date().toLocaleString()
    });

  } catch (error) {
    console.error(error);
    // 容错：如果API挂了，返回一个模拟数据供调试，并在前端提示
    res.status(200).json({
      price: 0,
      ahr999: 0,
      strategy: "数据源连接超时",
      multiplier: 0,
      frequency: "--",
      error: true
    });
  }
}

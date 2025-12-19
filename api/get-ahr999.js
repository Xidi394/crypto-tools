export default async function handler(req, res) {
  try {
    // 1. 去外部接口抓取比特币价格 (这里用 CoinDesk 的免费接口)
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const data = await response.json();
    const btcPrice = data.bpi.USD.rate_float;

    // 2. 模拟计算 Ahr999 指数 (真实公式需要历史数据，这里我们先写个简化逻辑演示架构)
    // 假设：如果价格低于 50000 算抄底，高于 100000 算逃顶
    // 为了演示，我们把 "价格除以 100000" 当作模拟指数
    const ahr999Index = (btcPrice / 100000).toFixed(2);
    
    let advice = "观望";
    if (ahr999Index < 0.45) advice = "抄底";
    else if (ahr999Index > 1.2) advice = "逃顶";

    // 3. 把结果打包发给前端
    res.status(200).json({
      price: btcPrice,
      index: ahr999Index,
      advice: advice,
      updateTime: new Date().toLocaleString()
    });

  } catch (error) {
    res.status(500).json({ error: '数据抓取失败', details: error.message });
  }
}

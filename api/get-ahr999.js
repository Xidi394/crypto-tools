export default async function handler(req, res) {
  try {
    // 1. 改用 Blockchain.info 接口 (它是币圈最老牌的接口，不封 Vercel IP)
    const response = await fetch('https://blockchain.info/ticker');
    
    if (!response.ok) {
        throw new Error('外部接口连接失败');
    }

    const data = await response.json();
    
    // Blockchain.info 的数据结构是: { "USD": { "last": 95000.50, ... } }
    // 所以我们要提取 data.USD.last
    const btcPrice = data.USD.last;

    // 2. 模拟计算 Ahr999 (依然用 /100000 做演示)
    const ahr999Index = (btcPrice / 100000).toFixed(2);
    
    let advice = "观望";
    if (ahr999Index < 0.45) advice = "抄底";
    else if (ahr999Index > 1.2) advice = "逃顶";

    // 3. 发货
    res.status(200).json({
      price: btcPrice,
      index: ahr999Index,
      advice: advice,
      updateTime: new Date().toLocaleString()
    });

  } catch (error) {
    console.error("后端报错:", error);
    // 如果还是失败，为了不让你看到 undefined，我们返回一个“假数据”让你知道流程是通的
    res.status(200).json({
      price: 99999, 
      index: 0.99,
      advice: "接口维护中(显示演示数据)",
      updateTime: "获取失败，请重试"
    });
  }
}

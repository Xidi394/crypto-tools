export default async function handler(req, res) {
  try {
    // 【关键修复】给请求头添加 User-Agent，伪装成浏览器
    // 否则 CoinDesk 会拒绝 Vercel 的服务器请求
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`外部接口报错: ${response.status}`);
    }

    const data = await response.json();
    const btcPrice = data.bpi.USD.rate_float;

    // 模拟 Ahr999 计算
    const ahr999Index = (btcPrice / 100000).toFixed(2);
    
    let advice = "观望";
    if (ahr999Index < 0.45) advice = "抄底";
    else if (ahr999Index > 1.2) advice = "逃顶";

    res.status(200).json({
      price: btcPrice,
      index: ahr999Index,
      advice: advice,
      updateTime: new Date().toLocaleString()
    });

  } catch (error) {
    console.error("API 错误详情:", error);
    // 返回一个特殊的错误标记，方便前端识别
    res.status(500).json({ 
        error: true, 
        message: '数据获取失败',
        debug: error.message 
    });
  }
}

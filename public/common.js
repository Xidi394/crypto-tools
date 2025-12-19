// 翻译字典
const translations = {
    "en": {
        title: "Hua Xiaohan - Crypto Tools",
        desc: "Professional Ahr999 & Bitcoin DCA Analysis Tool",
        price: "Bitcoin Price",
        ahr_label: "Ahr999 Index (Bottom)",
        mayer_label: "Escape Top (Mayer/MVRV)",
        strategy: "Strategy",
        calc_title: "Smart DCA Calculator",
        base_amt: "Base Amount (1 Unit)",
        buy_this_round: "Invest Amount",
        refresh: "Refresh Data",
        freq_label: "Frequency:",
        freq_daily: "Daily Invest (24h)",
        freq_weekly: "Weekly Invest (7d)",
        disclaimer_title: "Disclaimer",
        disclaimer_text: "Data provided by 'Hua Xiaohan' is for reference only. Crypto trading involves high risks. Please DYOR.",
        
        // 状态翻译
        status_stop_high: "🚫 High Price (Wait)",
        status_buy_1: "😐 Normal Zone (1x)",
        status_buy_2: "🙂 Undervalued (2x)",
        status_buy_4: "😄 Buy Zone (4x)",
        status_buy_8: "🤩 Heavy Buy (8x)",
        status_buy_16: "💎 Diamond Bottom (16x)",
        status_cant_buy_top: "☠️ TOP SIGNAL (STOP BUY)",
        status_cant_buy_risk: "🔥 HIGH RISK (STOP BUY)",
        
        sell_safe: "✅ Safe Zone",
        sell_elevated: "⚠️ Heating Up",
        sell_high_risk: "🔥 High Risk (Consider Sell)",
        sell_top_danger: "☠️ ESCAPE NOW (Peak)"
    },
    "zh": {
        title: "花小寒 - 加密货币定投助手",
        desc: "专业的 Ahr999 指数与比特币定投分析工具",
        price: "比特币现价",
        ahr_label: "Ahr999 指数 (抄底)",
        mayer_label: "逃顶指标 (MVRV参考)",
        strategy: "当前策略",
        calc_title: "智能定投计算器",
        base_amt: "基础金额 (1份)",
        buy_this_round: "本期应投",
        refresh: "刷新数据",
        freq_label: "定投频率:",
        freq_daily: "⚡ 每日定投 (天投)",
        freq_weekly: "📅 每周定投 (周投)",
        disclaimer_title: "免责声明",
        disclaimer_text: "“花小寒”提供的数据仅供参考，不构成投资建议。加密货币交易具有极高风险，请自行研究 (DYOR)。",
        
        status_stop_high: "🚫 价格过高 (暂停)",
        status_buy_1: "😐 正常定投 (买1份)",
        status_buy_2: "🙂 低估区间 (买2份)",
        status_buy_4: "😄 抄底区间 (买4份)",
        status_buy_8: "🤩 极度低估 (买8份)",
        status_buy_16: "💎 钻石底 (梭哈 16份)",
        status_cant_buy_top: "☠️ 顶部确立 (禁止买入)",
        status_cant_buy_risk: "🔥 高风险 (停止定投)",
        
        sell_safe: "✅ 安全区域",
        sell_elevated: "⚠️ 情绪升温",
        sell_high_risk: "🔥 高风险 (考虑止盈)",
        sell_top_danger: "☠️ 顶部预警 (快跑)"
    },
    // ... 其他语言保留原样或按需添加 ...
    "zh-TW": {
        title: "花小寒 - 加密貨幣定投助手",
        price: "比特幣現價",
        ahr_label: "Ahr999 指數",
        mayer_label: "逃頂指標",
        base_amt: "基礎金額 (1份)",
        buy_this_round: "本期應投",
        refresh: "刷新數據",
        freq_label: "定投頻率:",
        freq_daily: "⚡ 每日定投",
        freq_weekly: "📅 每週定投",
        disclaimer_title: "免責聲明",
        disclaimer_text: "僅供參考，不構成投資建議。DYOR。",
        status_stop_high: "🚫 價格過高 (暫停)",
        status_buy_1: "😐 正常定投 (1倍)",
        status_buy_2: "🙂 低估區間 (2倍)",
        status_buy_4: "😄 抄底區間 (4倍)",
        status_buy_8: "🤩 極度低估 (8倍)",
        status_buy_16: "💎 鑽石底 (16倍)",
        status_cant_buy_top: "☠️ 頂部確立 (禁止買入)",
        sell_safe: "✅ 安全區域",
        sell_high_risk: "🔥 高風險",
        sell_top_danger: "☠️ 頂部預警"
    },
    "ja": {
        title: "花小寒 - 仮想通貨ツール",
        price: "BTC価格",
        ahr_label: "Ahr999指数",
        mayer_label: "売りシグナル",
        base_amt: "基本額 (1単位)",
        buy_this_round: "投資額",
        refresh: "更新",
        freq_label: "頻度:",
        freq_daily: "⚡ 毎日積立",
        freq_weekly: "📅 毎週積立",
        disclaimer_title: "免責事項",
        disclaimer_text: "投資助言ではありません。DYOR。",
        status_buy_1: "😐 通常 (1倍)",
        status_buy_2: "🙂 割安 (2倍)",
        status_buy_16: "💎 底値 (16倍)",
        status_cant_buy_top: "☠️ 天井 (購入停止)"
    },
    "ko": {
        title: "화샤오한 - 암호화폐 도구",
        price: "현재 가격",
        ahr_label: "Ahr999 지수",
        mayer_label: "매도 지표",
        base_amt: "기본 투자금",
        buy_this_round: "투자금",
        refresh: "새로고침",
        freq_label: "주기:",
        freq_daily: "⚡ 매일 투자",
        freq_weekly: "📅 매주 투자",
        disclaimer_title: "면책 조항",
        disclaimer_text: "재정적 조언이 아닙니다. DYOR.",
        status_buy_1: "😐 일반 (1배)",
        status_buy_16: "💎 바닥 (16배)",
        status_cant_buy_top: "☠️ 고점 (매수 금지)"
    }
};

let currentLang = 'zh';

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        currentLang = savedLang;
    } else {
        const browserLang = navigator.language.slice(0, 2);
        if (translations[browserLang]) currentLang = browserLang;
    }
    
    document.getElementById('lang-select').value = currentLang;
    applyTranslation();
    
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

function changeLang() {
    const select = document.getElementById('lang-select');
    currentLang = select.value;
    localStorage.setItem('lang', currentLang);
    applyTranslation();
    fetchData(); 
}

function applyTranslation() {
    const t = translations[currentLang] || translations['en'];
    document.title = t.title;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

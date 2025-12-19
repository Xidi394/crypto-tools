// ==========================================
// 1. 全局配置与汇率定义
// ==========================================
const exchangeRates = {
    "USD": { rate: 1, symbol: "$" },
    "CNY": { rate: 7.28, symbol: "¥" },
    "HKD": { rate: 7.83, symbol: "HK$" },
    "JPY": { rate: 155.5, symbol: "JP¥" },
    "KRW": { rate: 1430, symbol: "₩" }
};

// 这里严格对应你的定投阶梯规则
const statusTranslations = {
    "en": {
        "daily": "⚡ Daily Invest (< 0.3)",
        "weekly": "📅 Weekly Invest (> 0.3)",
        "stop_high": "🚫 High Price (Wait)",
        "buy_1": "😐 Normal (Buy 1x)",
        "buy_2": "🙂 Value (Buy 2x)",
        "buy_4": "😄 Buy Zone (Buy 4x)",
        "buy_8": "🤩 Strong Buy (Buy 8x)",
        "buy_16": "💎 Diamond Bottom (Buy 16x)",
        "cant_buy_top": "☠️ TOP SIGNAL (STOP)",
        "safe": "✅ Safe Zone",
        "elevated": "⚠️ Heating Up",
        "high_risk": "🔥 High Risk",
        "top_danger": "☠️ ESCAPE NOW"
    },
    "zh": {
        "daily": "⚡ 每日定投 (Ahr < 0.3)",
        "weekly": "📅 每周定投 (Ahr > 0.3)",
        "stop_high": "🚫 价格过高 (暂停买入)",
        "buy_1": "😐 正常定投 (买1份)",
        "buy_2": "🙂 低估区间 (买2份)",
        "buy_4": "😄 抄底区间 (买4份)",
        "buy_8": "🤩 极度低估 (买8份)",
        "buy_16": "💎 钻石底 (梭哈 16份)",
        "cant_buy_top": "☠️ 顶部确立 (禁止买入)",
        "safe": "✅ 安全区域",
        "elevated": "⚠️ 情绪升温",
        "high_risk": "🔥 高风险 (考虑止盈)",
        "top_danger": "☠️ 顶部预警 (快跑)"
    },
    "ja": {
        "daily": "⚡ 毎日積立 (< 0.3)",
        "weekly": "📅 毎週積立 (> 0.3)",
        "stop_high": "🚫 待機 (高値)",
        "buy_1": "😐 通常 (1倍)",
        "buy_2": "🙂 割安 (2倍)",
        "buy_4": "😄 買い場 (4倍)",
        "buy_8": "🤩 大チャンス (8倍)",
        "buy_16": "💎 底値 (16倍)",
        "cant_buy_top": "☠️ 天井 (購入停止)",
        "safe": "✅ 安全圏",
        "elevated": "⚠️ 加熱",
        "high_risk": "🔥 高リスク",
        "top_danger": "☠️ 逃げて"
    }
    // 韩语同理
};

const translations = {
    "en": {
        app_name: "Crypto Tools",
        menu_home: "🏠 Dashboard",
        menu_backtest: "📉 Backtest",
        settings: "Settings", lang_sel: "Language", close: "Close",
        
        // Dashboard
        price_label: "Bitcoin Price",
        ahr_label: "Ahr999 Index",
        mayer_label: "Mayer Multiple (Sell)",
        calc_title: "Smart DCA Calculator",
        base_amt: "Base Amount (1 Unit)",
        invest_freq: "Frequency",
        invest_today: "Invest Today",

        // Backtest
        bt_title: "DCA Calculator",
        bt_desc: "Calculate crypto DCA returns with historical data.",
        bt_settings: "Parameters",
        bt_coin: "Symbol",
        bt_amount: "Amount",
        bt_start: "Start Date",
        bt_end: "End Date",
        bt_freq: "Frequency",
        bt_btn_reset: "Reset",
        bt_btn_calc: "Calculate",
        bt_res_title: "Results",
        bt_total_coins: "Total Coins",
        bt_est_profit: "Est. Profit",
        bt_invested: "Total Invested",
        bt_curr_val: "Current Value",
        bt_avg_price: "Avg Price",
        bt_count: "Count",
        bt_table_title: "Records",
        bt_download: "Download CSV",
        
        // Table Headers
        th_date: "Date", th_invest: "Invest", th_price: "Price", 
        th_coins: "Coins", th_total_inv: "Total Inv", th_total_coins: "Total Coins", th_avg: "Avg Price"
    },
    "zh": {
        app_name: "花小寒工具箱",
        menu_home: "🏠 行情看板",
        menu_backtest: "📉 定投回测",
        settings: "设置", lang_sel: "语言", close: "关闭",
        
        // Dashboard
        price_label: "比特币现价",
        ahr_label: "Ahr999 指数 (抄底)",
        mayer_label: "卖出参考 (Mayer倍数)",
        calc_title: "智能定投计算器",
        base_amt: "基础金额 (1份)",
        invest_freq: "建议频率",
        invest_today: "本期应买入",

        // Backtest
        bt_title: "加密货币定投收益计算器",
        bt_desc: "基于真实历史数据回测，智能计算定投 (DCA) 投资回报率",
        bt_settings: "回测参数设置",
        bt_coin: "定投币种",
        bt_amount: "定投金额",
        bt_start: "开始时间",
        bt_end: "结束时间",
        bt_freq: "定投频率",
        bt_btn_reset: "一键重置",
        bt_btn_calc: "立即回测结果",
        bt_res_title: "回测结果分析",
        bt_total_coins: "累计持仓",
        bt_est_profit: "预估收益",
        bt_invested: "投入本金",
        bt_curr_val: "当前价值",
        bt_avg_price: "持仓均价",
        bt_count: "定投次数",
        bt_table_title: "详细定投记录",
        bt_download: "下载记录 (.csv)",
        
        // Table Headers
        th_date: "日期", th_invest: "本期投入", th_price: "成交价", 
        th_coins: "获得数量", th_total_inv: "累计投入", th_total_coins: "累计持仓", th_avg: "持仓均价"
    }
};

let currentLang = localStorage.getItem('lang') || 'zh';
let currentCurrency = localStorage.getItem('currency') || 'USD';
let isDark = localStorage.getItem('theme') === 'dark';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    injectNavigation(); 
    applySettings();
    // 如果当前页面有初始化逻辑，执行它
    if (window.pageInit) window.pageInit();
});

// 注入导航栏
function injectNavigation() {
    const navHTML = `
    <div id="global-nav" style="display:flex; justify-content:space-between; align-items:center; padding:15px 20px; background:var(--card-bg); border-bottom:1px solid rgba(0,0,0,0.05); position:relative; z-index:50;">
        <div style="display:flex; align-items:center; gap:15px;">
            <button onclick="toggleSidebar()" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--text); padding:0;">☰</button>
            <div style="font-weight:bold; font-size:18px;">🌸 <span data-i18n="app_name">...</span></div>
        </div>
        <div style="display:flex; gap:10px;">
             <select id="global-currency" onchange="changeCurrency(this.value)" style="padding:5px; border-radius:6px; border:1px solid #ddd; background:var(--bg); color:var(--text);">
                <option value="USD">USD ($)</option>
                <option value="CNY">CNY (¥)</option>
                <option value="HKD">HKD ($)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="KRW">KRW (₩)</option>
            </select>
            <button onclick="toggleTheme()" style="background:none; border:none; font-size:18px; cursor:pointer;">🌗</button>
        </div>
    </div>

    <div id="sidebar-overlay" onclick="toggleSidebar()" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:none; z-index:998;"></div>
    
    <div id="sidebar" style="position:fixed; top:0; left:0; width:250px; height:100%; background:var(--card-bg); transition:transform 0.3s ease; transform: translateX(-100%); z-index:999; padding:20px; box-shadow:2px 0 10px rgba(0,0,0,0.1); display:flex; flex-direction:column;">
        <h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:15px; color:var(--text);" data-i18n="settings">Settings</h3>
        <a href="index.html" class="nav-link" data-i18n="menu_home">🏠 Home</a>
        <a href="backtest.html" class="nav-link" data-i18n="menu_backtest">📉 Backtest</a>
        <div style="margin-top:auto; border-top:1px solid #eee; padding-top:20px;">
            <label style="display:block; margin-bottom:5px; font-size:12px; opacity:0.7; color:var(--text);" data-i18n="lang_sel">Language</label>
            <select id="sidebar-lang" onchange="changeLang(this.value)" style="width:100%; padding:8px; margin-bottom:15px; border-radius:6px; background:var(--bg); color:var(--text); border:1px solid #ddd;">
                <option value="zh">中文</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
            </select>
            <button onclick="toggleSidebar()" style="width:100%; padding:10px; background:var(--bg); border:1px solid #ddd; border-radius:6px; cursor:pointer; color:var(--text);" data-i18n="close">Close</button>
        </div>
    </div>
    <style>.nav-link { display:block; padding:12px 0; text-decoration:none; color:var(--text); font-weight:bold; font-size:16px; border-bottom:1px solid rgba(0,0,0,0.05); } .nav-link:hover { color: var(--accent); }</style>
    `;
    const old = document.getElementById('global-nav'); if(old) old.remove();
    document.body.insertAdjacentHTML('afterbegin', navHTML);
}

function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('sidebar-overlay');
    if (sb.style.transform === 'translateX(0px)') {
        sb.style.transform = 'translateX(-100%)'; ov.style.display = 'none';
    } else {
        sb.style.transform = 'translateX(0px)'; ov.style.display = 'block';
    }
}

function applySettings() {
    if (isDark) document.body.classList.add('dark-mode'); else document.body.classList.remove('dark-mode');
    
    const ls = document.getElementById('sidebar-lang'); if(ls) ls.value = currentLang;
    const cs = document.getElementById('global-currency'); if(cs) cs.value = currentCurrency;

    const t = translations[currentLang] || translations['en'];
    // 核心翻译逻辑：找到所有有 data-i18n 的元素并替换文本
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });

    if (window.refreshData) window.refreshData();
}

function changeLang(v) { currentLang = v; localStorage.setItem('lang', v); applySettings(); }
function changeCurrency(v) { currentCurrency = v; localStorage.setItem('currency', v); applySettings(); }
function toggleTheme() { isDark = !isDark; localStorage.setItem('theme', isDark ? 'dark' : 'light'); applySettings(); }

function formatMoney(amount) {
    if (amount === undefined || amount === null) return "--";
    const info = exchangeRates[currentCurrency] || exchangeRates["USD"];
    const val = amount * info.rate;
    const digits = (currentCurrency === 'JPY' || currentCurrency === 'KRW') ? 0 : 2;
    return info.symbol + " " + val.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function getStatusText(key) {
    const t = statusTranslations[currentLang] || statusTranslations['en'];
    return t[key] || key;
}

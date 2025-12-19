// ==========================================
// 1. 全局配置与汇率定义
// ==========================================
const exchangeRates = {
    "USD": { rate: 1, symbol: "$" },
    "CNY": { rate: 7.25, symbol: "¥" },
    "HKD": { rate: 7.8, symbol: "HK$" },
    "JPY": { rate: 150, symbol: "JP¥" },
    "KRW": { rate: 1380, symbol: "₩" }
};

// 状态码对应的翻译字典
const statusTranslations = {
    "en": {
        // 频率
        "daily": "⚡ Daily Invest",
        "weekly": "📅 Weekly Invest",
        // 买入状态
        "stop_high": "🚫 High Price (Wait)",
        "buy_1": "😐 Normal Zone (1x)",
        "buy_2": "🙂 Undervalued (2x)",
        "buy_4": "😄 Buy Zone (4x)",
        "buy_8": "🤩 Heavy Buy (8x)",
        "buy_16": "💎 Diamond Bottom (16x)",
        "cant_buy_top": "☠️ TOP (STOP BUY)",
        // 卖出状态
        "safe": "✅ Safe Zone",
        "elevated": "⚠️ Heating Up",
        "high_risk": "🔥 High Risk",
        "top_danger": "☠️ ESCAPE NOW"
    },
    "zh": {
        // 频率
        "daily": "⚡ 每日定投 (机会难得)",
        "weekly": "📅 每周定投",
        // 买入状态
        "stop_high": "🚫 价格过高 (暂停买入)",
        "buy_1": "😐 正常定投 (买1份)",
        "buy_2": "🙂 低估区间 (买2份)",
        "buy_4": "😄 抄底区间 (买4份)",
        "buy_8": "🤩 极度低估 (买8份)",
        "buy_16": "💎 钻石底 (梭哈 16份)",
        "cant_buy_top": "☠️ 顶部确立 (禁止买入)",
        // 卖出状态
        "safe": "✅ 安全区域",
        "elevated": "⚠️ 情绪升温",
        "high_risk": "🔥 高风险 (考虑止盈)",
        "top_danger": "☠️ 顶部预警 (快跑)"
    }
    // 日韩语略，逻辑同上
};

const translations = {
    "en": {
        app_name: "Hua Xiaohan Tools",
        menu_home: "🏠 Dashboard",
        menu_backtest: "📉 Backtest",
        settings: "Settings",
        lang_sel: "Language",
        curr_sel: "Currency",
        price_label: "Bitcoin Price",
        ahr_label: "Ahr999 Index",
        mayer_label: "Sell Indicator (Mayer)",
        calc_title: "Smart DCA Calculator",
        base_amt: "Base Amount (1 Unit)",
        invest_freq: "Frequency",
        invest_today: "Invest Today",
        close: "Close"
    },
    "zh": {
        app_name: "花小寒工具箱",
        menu_home: "🏠 行情看板",
        menu_backtest: "📉 定投回测",
        settings: "设置",
        lang_sel: "语言",
        curr_sel: "货币单位",
        price_label: "比特币现价",
        ahr_label: "Ahr999 指数 (抄底)",
        mayer_label: "卖出参考 (Mayer倍数)",
        calc_title: "智能定投计算器",
        base_amt: "基础金额 (1份)",
        invest_freq: "建议频率",
        invest_today: "本期应买入",
        close: "关闭"
    }
};

// ==========================================
// 2. 初始化逻辑
// ==========================================
let currentLang = localStorage.getItem('lang') || 'zh';
let currentCurrency = localStorage.getItem('currency') || 'USD';
let isDark = localStorage.getItem('theme') === 'dark';

document.addEventListener('DOMContentLoaded', () => {
    injectNavigation(); 
    applySettings();    
    if (typeof window.pageInit === 'function') window.pageInit();
});

// ==========================================
// 3. 导航栏与交互
// ==========================================
function injectNavigation() {
    const navHTML = `
    <div id="global-nav" style="display:flex; justify-content:space-between; align-items:center; padding:15px; margin-bottom:20px; background:var(--card-bg); border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,0.05);">
        <div style="display:flex; align-items:center; gap:15px;">
            <button onclick="toggleSidebar()" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--text);">☰</button>
            <div style="font-weight:bold; font-size:18px;">🌸 <span data-i18n="app_name">...</span></div>
        </div>
        <div style="display:flex; gap:10px;">
             <select id="global-currency" onchange="changeCurrency(this.value)" style="padding:5px; border-radius:6px; border:1px solid #ddd;">
                <option value="USD">USD ($)</option>
                <option value="CNY">CNY (¥)</option>
            </select>
            <button onclick="toggleTheme()" style="background:none; border:none; font-size:18px; cursor:pointer;">🌗</button>
        </div>
    </div>
    <div id="sidebar-overlay" onclick="toggleSidebar()" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:none; z-index:998;"></div>
    <div id="sidebar" style="position:fixed; top:0; left:-250px; width:250px; height:100%; background:var(--card-bg); transition:0.3s; z-index:999; padding:20px; box-shadow:2px 0 10px rgba(0,0,0,0.1); display:flex; flex-direction:column;">
        <h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:15px;" data-i18n="settings">Settings</h3>
        <a href="index.html" class="nav-link" data-i18n="menu_home">🏠 Home</a>
        <a href="backtest.html" class="nav-link" data-i18n="menu_backtest">📉 Backtest</a>
        <div style="margin-top:auto; border-top:1px solid #eee; padding-top:20px;">
            <label style="display:block; margin-bottom:5px; font-size:12px; opacity:0.7;" data-i18n="lang_sel">Language</label>
            <select id="sidebar-lang" onchange="changeLang(this.value)" style="width:100%; padding:8px; margin-bottom:15px; border-radius:6px;">
                <option value="zh">中文</option>
                <option value="en">English</option>
            </select>
            <button onclick="toggleSidebar()" style="width:100%; padding:10px; background:#f5f5f5; border:none; border-radius:6px; cursor:pointer; color:#333;" data-i18n="close">Close</button>
        </div>
    </div>
    <style>.nav-link { display:block; padding:12px 0; text-decoration:none; color:var(--text); font-weight:bold; font-size:16px; border-bottom:1px solid rgba(0,0,0,0.05); } .nav-link:hover { color: var(--accent); }</style>
    `;
    document.body.insertAdjacentHTML('afterbegin', navHTML);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const isOpen = sidebar.style.left === '0px';
    sidebar.style.left = isOpen ? '-250px' : '0px';
    overlay.style.display = isOpen ? 'none' : 'block';
}

function applySettings() {
    if (isDark) document.body.classList.add('dark-mode'); else document.body.classList.remove('dark-mode');
    const langSelect = document.getElementById('sidebar-lang'); if(langSelect) langSelect.value = currentLang;
    const currSelect = document.getElementById('global-currency'); if(currSelect) currSelect.value = currentCurrency;

    const t = translations[currentLang] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });

    if (typeof window.refreshData === 'function') window.refreshData();
}

function toggleTheme() { isDark = !isDark; localStorage.setItem('theme', isDark ? 'dark' : 'light'); applySettings(); }
function changeLang(lang) { currentLang = lang; localStorage.setItem('lang', lang); applySettings(); }
function changeCurrency(curr) { currentCurrency = curr; localStorage.setItem('currency', curr); applySettings(); }

function formatMoney(usdAmount) {
    const info = exchangeRates[currentCurrency] || exchangeRates["USD"];
    const converted = usdAmount * info.rate;
    return info.symbol + " " + converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// 辅助函数：获取状态翻译
function getStatusText(code) {
    const dict = statusTranslations[currentLang] || statusTranslations['en'];
    return dict[code] || code;
}

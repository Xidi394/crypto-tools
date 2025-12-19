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

const translations = {
    "en": {
        app_name: "Hua Xiaohan Tools",
        menu_home: "🏠 Market Dashboard",
        menu_backtest: "📉 DCA Backtest",
        menu_ledger: "📒 Ledger (Coming)",
        settings: "Settings",
        theme_toggle: "Dark/Light",
        lang_sel: "Language",
        curr_sel: "Currency",
        close: "Close"
    },
    "zh": {
        app_name: "花小寒工具箱",
        menu_home: "🏠 行情看板",
        menu_backtest: "📉 定投回测 (DCA)",
        menu_ledger: "📒 记账本 (开发中)",
        settings: "设置",
        theme_toggle: "夜间/日间",
        lang_sel: "语言",
        curr_sel: "货币单位",
        close: "关闭"
    },
    "ja": {
        app_name: "花小寒ツール",
        menu_home: "🏠 市況ボード",
        menu_backtest: "📉 積立シミュレーション",
        menu_ledger: "📒 家計簿 (開発中)",
        settings: "設定",
        theme_toggle: "テーマ切替",
        lang_sel: "言語",
        curr_sel: "通貨",
        close: "閉じる"
    },
    "ko": {
        app_name: "Hua Xiaohan 도구",
        menu_home: "🏠 시세 현황",
        menu_backtest: "📉 DCA 백테스트",
        menu_ledger: "📒 장부 (개발 중)",
        settings: "설정",
        theme_toggle: "테마 전환",
        lang_sel: "언어",
        curr_sel: "통화",
        close: "닫기"
    }
};

// ==========================================
// 2. 初始化逻辑 (一加载页面就执行)
// ==========================================
let currentLang = localStorage.getItem('lang') || 'zh';
let currentCurrency = localStorage.getItem('currency') || 'USD';
let isDark = localStorage.getItem('theme') === 'dark';

document.addEventListener('DOMContentLoaded', () => {
    injectNavigation(); // 1. 插入导航栏
    applySettings();    // 2. 应用所有设置
    
    // 如果当前页面有特定的初始化函数，执行它
    if (typeof window.pageInit === 'function') window.pageInit();
});

// ==========================================
// 3. 动态插入导航栏 (汉堡菜单 + 标题)
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
                <option value="HKD">HKD (HK$)</option>
                <option value="JPY">JPY (JP¥)</option>
                <option value="KRW">KRW (₩)</option>
            </select>
            <button onclick="toggleTheme()" style="background:none; border:none; font-size:18px; cursor:pointer;">🌗</button>
        </div>
    </div>

    <div id="sidebar-overlay" onclick="toggleSidebar()" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:none; z-index:998;"></div>
    <div id="sidebar" style="position:fixed; top:0; left:-250px; width:250px; height:100%; background:var(--card-bg); transition:0.3s; z-index:999; padding:20px; box-shadow:2px 0 10px rgba(0,0,0,0.1); display:flex; flex-direction:column;">
        <h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:15px;" data-i18n="settings">Settings</h3>
        
        <a href="index.html" class="nav-link" data-i18n="menu_home">🏠 Home</a>
        <a href="backtest.html" class="nav-link" data-i18n="menu_backtest">📉 Backtest</a>
        <a href="#" class="nav-link" style="opacity:0.5;" data-i18n="menu_ledger">📒 Ledger</a>
        
        <div style="margin-top:auto; border-top:1px solid #eee; padding-top:20px;">
            <label style="display:block; margin-bottom:5px; font-size:12px; opacity:0.7;" data-i18n="lang_sel">Language</label>
            <select id="sidebar-lang" onchange="changeLang(this.value)" style="width:100%; padding:8px; margin-bottom:15px; border-radius:6px;">
                <option value="zh">中文</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
            </select>
            
            <button onclick="toggleSidebar()" style="width:100%; padding:10px; background:#f5f5f5; border:none; border-radius:6px; cursor:pointer; color:#333;" data-i18n="close">Close</button>
        </div>
    </div>
    
    <style>
        .nav-link { display:block; padding:12px 0; text-decoration:none; color:var(--text); font-weight:bold; font-size:16px; border-bottom:1px solid rgba(0,0,0,0.05); }
        .nav-link:hover { color: var(--accent); }
    </style>
    `;
    
    // 插入到 body 的最前面
    document.body.insertAdjacentHTML('afterbegin', navHTML);
}

// ==========================================
// 4. 交互逻辑 (开关、切换)
// ==========================================
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const isOpen = sidebar.style.left === '0px';
    
    sidebar.style.left = isOpen ? '-250px' : '0px';
    overlay.style.display = isOpen ? 'none' : 'block';
}

function applySettings() {
    // 1. 应用夜间模式
    if (isDark) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
    
    // 2. 同步输入框状态
    const langSelect = document.getElementById('sidebar-lang');
    if(langSelect) langSelect.value = currentLang;
    
    const currSelect = document.getElementById('global-currency');
    if(currSelect) currSelect.value = currentCurrency;

    // 3. 执行翻译
    const t = translations[currentLang] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });

    // 4. 触发页面特定的重新渲染 (如果页面有 refreshData 函数)
    if (typeof window.refreshData === 'function') window.refreshData();
}

function toggleTheme() {
    isDark = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applySettings();
}

function changeLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applySettings();
}

function changeCurrency(curr) {
    currentCurrency = curr;
    localStorage.setItem('currency', curr);
    applySettings();
}

// ==========================================
// 5. 工具函数：金额格式化 (自动换算汇率)
// ==========================================
function formatMoney(usdAmount) {
    const info = exchangeRates[currentCurrency] || exchangeRates["USD"];
    const converted = usdAmount * info.rate;
    
    // 格式化：加逗号，保留2位小数
    return info.symbol + " " + converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

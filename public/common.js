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

const statusTranslations = {
    "en": {
        "daily": "⚡ Daily", "weekly": "📅 Weekly", 
        "stop_high": "🚫 Wait", "buy_1": "😐 Normal", "buy_2": "🙂 Value", "buy_4": "😄 Buy", "buy_8": "🤩 Strong Buy", "buy_16": "💎 All In",
        "cant_buy_top": "☠️ TOP", "safe": "✅ Safe", "elevated": "⚠️ Warm", "high_risk": "🔥 Risk", "top_danger": "☠️ ESCAPE"
    },
    "zh": {
        "daily": "⚡ 每日定投", "weekly": "📅 每周定投", 
        "stop_high": "🚫 暂停", "buy_1": "😐 正常", "buy_2": "🙂 低估", "buy_4": "😄 抄底", "buy_8": "🤩 极度低估", "buy_16": "💎 钻石底",
        "cant_buy_top": "☠️ 顶部", "safe": "✅ 安全", "elevated": "⚠️ 升温", "high_risk": "🔥 高风险", "top_danger": "☠️ 快跑"
    },
    // 日韩语略，逻辑一致，自动回落英文
};

const translations = {
    "en": {
        app_name: "Crypto Tools",
        menu_home: "🏠 Dashboard",
        menu_backtest: "📉 Backtest",
        settings: "Settings", lang_sel: "Language", close: "Close",
        // --- 新增：回测页面专用词汇 ---
        bt_title: "DCA Calculator",
        bt_desc: "Calculate crypto DCA returns with historical data.",
        bt_settings: "Backtest Settings",
        bt_coin: "Symbol",
        bt_amount: "Amount",
        bt_start: "Start Date",
        bt_end: "End Date",
        bt_freq: "Frequency",
        bt_btn_reset: "Reset",
        bt_btn_calc: "Calculate Now",
        bt_res_title: "Analysis Result",
        bt_total_coins: "Total Coins",
        bt_est_profit: "Est. Profit",
        bt_invested: "Invested",
        bt_curr_val: "Current Value",
        bt_avg_price: "Avg Price",
        bt_count: "Count",
        bt_download: "Download CSV"
    },
    "zh": {
        app_name: "花小寒工具箱",
        menu_home: "🏠 行情看板",
        menu_backtest: "📉 定投回测",
        settings: "设置", lang_sel: "语言", close: "关闭",
        // --- 新增：回测页面专用词汇 ---
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
        bt_download: "下载记录 (.csv)"
    },
    "ja": {
        app_name: "仮想通貨ツール",
        menu_home: "🏠 市況ボード",
        menu_backtest: "📉 積立シミュレーション",
        settings: "設定", lang_sel: "言語", close: "閉じる",
        // --- 新增：回测页面专用词汇 ---
        bt_title: "積立投資計算機 (DCA)",
        bt_desc: "過去のデータに基づいて積立投資の収益を計算します",
        bt_settings: "パラメータ設定",
        bt_coin: "通貨 (BTC等)",
        bt_amount: "投資額",
        bt_start: "開始日",
        bt_end: "終了日",
        bt_freq: "頻度",
        bt_btn_reset: "リセット",
        bt_btn_calc: "計算する",
        bt_res_title: "分析結果",
        bt_total_coins: "保有数量",
        bt_est_profit: "予想収益",
        bt_invested: "投資総額",
        bt_curr_val: "現在の価値",
        bt_avg_price: "平均取得単価",
        bt_count: "回数",
        bt_download: "CSVダウンロード"
    },
    "ko": {
        app_name: "암호화폐 도구",
        menu_home: "🏠 시세 현황",
        menu_backtest: "📉 DCA 백테스트",
        settings: "설정", lang_sel: "언어", close: "닫기",
        // --- 新增：回测页面专用词汇 ---
        bt_title: "적립식 투자 계산기",
        bt_desc: "과거 데이터를 기반으로 DCA 수익률을 계산합니다",
        bt_settings: "백테스트 설정",
        bt_coin: "코인 (BTC)",
        bt_amount: "투자금",
        bt_start: "시작일",
        bt_end: "종료일",
        bt_freq: "주기",
        bt_btn_reset: "초기화",
        bt_btn_calc: "계산하기",
        bt_res_title: "분석 결과",
        bt_total_coins: "보유 수량",
        bt_est_profit: "예상 수익",
        bt_invested: "총 투자금",
        bt_curr_val: "현재 가치",
        bt_avg_price: "평단가",
        bt_count: "횟수",
        bt_download: "CSV 다운로드"
    }
};

let currentLang = localStorage.getItem('lang') || 'zh';
let currentCurrency = localStorage.getItem('currency') || 'USD';
let isDark = localStorage.getItem('theme') === 'dark';

document.addEventListener('DOMContentLoaded', () => {
    injectNavigation(); 
    applySettings();    
    if (typeof window.pageInit === 'function') window.pageInit();
});

// 动态注入导航栏（完全隐藏式侧边栏）
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
    
    <style>
        .nav-link { display:block; padding:12px 0; text-decoration:none; color:var(--text); font-weight:bold; font-size:16px; border-bottom:1px solid rgba(0,0,0,0.05); }
        .nav-link:hover { color: var(--accent); }
    </style>
    `;
    
    // 防止重复插入
    const oldNav = document.getElementById('global-nav');
    if(oldNav) oldNav.remove();
    
    document.body.insertAdjacentHTML('afterbegin', navHTML);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const isClosed = sidebar.style.transform === 'translateX(-100%)';
    
    if (isClosed) {
        sidebar.style.transform = 'translateX(0)';
        overlay.style.display = 'block';
    } else {
        sidebar.style.transform = 'translateX(-100%)';
        overlay.style.display = 'none';
    }
}

function applySettings() {
    // 1. 同步夜间模式
    if (isDark) document.body.classList.add('dark-mode'); else document.body.classList.remove('dark-mode');
    
    // 2. 同步下拉框
    const langSelect = document.getElementById('sidebar-lang'); if(langSelect) langSelect.value = currentLang;
    const currSelect = document.getElementById('global-currency'); if(currSelect) currSelect.value = currentCurrency;

    // 3. 执行翻译 (查找所有带有 data-i18n 的元素)
    const t = translations[currentLang] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });

    // 4. 通知页面刷新 (如果页面定义了 refreshData)
    if (typeof window.refreshData === 'function') window.refreshData();
}

function toggleTheme() { isDark = !isDark; localStorage.setItem('theme', isDark ? 'dark' : 'light'); applySettings(); }
function changeLang(lang) { currentLang = lang; localStorage.setItem('lang', lang); applySettings(); }
function changeCurrency(curr) { currentCurrency = curr; localStorage.setItem('currency', curr); applySettings(); }

// 核心：货币转换工具
function formatMoney(usdAmount) {
    if (usdAmount === undefined || usdAmount === null) return "--";
    const info = exchangeRates[currentCurrency] || exchangeRates["USD"];
    const converted = usdAmount * info.rate;
    return info.symbol + " " + converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getStatusText(code) {
    const dict = statusTranslations[currentLang] || statusTranslations['en'];
    return dict[code] || code;
}

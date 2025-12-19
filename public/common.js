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
        "daily": "⚡ Daily Invest",
        "weekly": "📅 Weekly Invest",
        "stop_high": "🚫 High Price (Wait)",
        "buy_1": "😐 Normal Zone (1x)",
        "buy_2": "🙂 Undervalued (2x)",
        "buy_4": "😄 Buy Zone (4x)",
        "buy_8": "🤩 Heavy Buy (8x)",
        "buy_16": "💎 Diamond Bottom (16x)",
        "cant_buy_top": "☠️ TOP (STOP BUY)",
        "safe": "✅ Safe Zone",
        "elevated": "⚠️ Heating Up",
        "high_risk": "🔥 High Risk",
        "top_danger": "☠️ ESCAPE NOW"
    },
    "zh": {
        "daily": "⚡ 每日定投 (机会难得)",
        "weekly": "📅 每周定投",
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
        "daily": "⚡ 毎日積立 (チャンス)",
        "weekly": "📅 毎週積立",
        "stop_high": "🚫 高値圏 (待機)",
        "buy_1": "😐 通常 (1倍)",
        "buy_2": "🙂 割安 (2倍)",
        "buy_4": "😄 買い時 (4倍)",
        "buy_8": "🤩 大チャンス (8倍)",
        "buy_16": "💎 底値 (16倍 全力)",
        "cant_buy_top": "☠️ 天井圏 (購入禁止)",
        "safe": "✅ 安全圏",
        "elevated": "⚠️ 加熱気味",
        "high_risk": "🔥 高リスク (利確検討)",
        "top_danger": "☠️ 逃げて (天井)"
    },
    "ko": {
        "daily": "⚡ 매일 투자 (기회)",
        "weekly": "📅 매주 투자",
        "stop_high": "🚫 고점 (대기)",
        "buy_1": "😐 일반 (1배)",
        "buy_2": "🙂 저평가 (2배)",
        "buy_4": "😄 매수 구간 (4배)",
        "buy_8": "🤩 강력 매수 (8배)",
        "buy_16": "💎 다이아 바닥 (16배)",
        "cant_buy_top": "☠️ 최고점 (매수 금지)",
        "safe": "✅ 안전 구간",
        "elevated": "⚠️ 과열 주의",
        "high_risk": "🔥 고위험 (매도 고려)",
        "top_danger": "☠️ 탈출 하세요 (최고점)"
    }
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
        mayer_label: "Mayer Multiple (Sell)",
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
    },
    "ja": {
        app_name: "花小寒ツール",
        menu_home: "🏠 市況ボード",
        menu_backtest: "📉 積立シミュレーション",
        settings: "設定",
        lang_sel: "言語",
        curr_sel: "通貨",
        price_label: "ビットコイン価格",
        ahr_label: "Ahr999 指数 (買い)",
        mayer_label: "Mayer倍率 (売り)",
        calc_title: "積立計算機",
        base_amt: "基本額 (1単位)",
        invest_freq: "推奨頻度",
        invest_today: "今回の投資額",
        close: "閉じる"
    },
    "ko": {
        app_name: "화샤오한 도구",
        menu_home: "🏠 시세 현황",
        menu_backtest: "📉 백테스트",
        settings: "설정",
        lang_sel: "언어",
        curr_sel: "통화",
        price_label: "비트코인 가격",
        ahr_label: "Ahr999 지수 (매수)",
        mayer_label: "Mayer 배수 (매도)",
        calc_title: "스마트 DCA 계산기",
        base_amt: "기본 금액 (1단위)",
        invest_freq: "추천 주기",
        invest_today: "금회 투자금",
        close: "닫기"
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

function injectNavigation() {
    // 侧边栏使用了 transform: translateX(-100%)，保证平时完全不可见
    const navHTML = `
    <div id="global-nav" style="display:flex; justify-content:space-between; align-items:center; padding:15px 20px; background:var(--card-bg); border-bottom:1px solid rgba(0,0,0,0.05);">
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
    
    // 清除旧导航（防止重复）
    const oldNav = document.getElementById('global-nav');
    if(oldNav) oldNav.remove();
    
    document.body.insertAdjacentHTML('afterbegin', navHTML);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    // 使用 class 或 style transform 来切换
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
    if (isDark) document.body.classList.add('dark-mode'); else document.body.classList.remove('dark-mode');
    
    const langSelect = document.getElementById('sidebar-lang'); 
    if(langSelect) langSelect.value = currentLang;
    
    const currSelect = document.getElementById('global-currency'); 
    if(currSelect) currSelect.value = currentCurrency;

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

// 核心货币转换：USD -> 目标货币
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

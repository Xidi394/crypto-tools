// ==========================================
// 1. 全局配置 (默认汇率作为备用，会自动更新)
// ==========================================
let exchangeRates = {
    "USD": { rate: 1, symbol: "$" },
    "CNY": { rate: 7.25, symbol: "¥" }, // 默认备用
    "HKD": { rate: 7.80, symbol: "HK$" },
    "JPY": { rate: 150.0, symbol: "JP¥" },
    "KRW": { rate: 1400.0, symbol: "₩" }
};

// 状态翻译 (Ahr999 策略)
const statusTranslations = {
    "en": {
        "daily": "⚡ Daily Invest (< 0.3)", "weekly": "📅 Weekly Invest (> 0.3)",
        "stop_high": "🚫 High Price (Wait)", "buy_1": "😐 Normal (Buy 1x)",
        "buy_2": "🙂 Value (Buy 2x)", "buy_4": "😄 Buy Zone (Buy 4x)",
        "buy_8": "🤩 Strong Buy (Buy 8x)", "buy_16": "💎 Diamond Bottom (Buy 16x)",
        "cant_buy_top": "☠️ TOP SIGNAL (STOP)", "safe": "✅ Safe Zone",
        "elevated": "⚠️ Heating Up", "high_risk": "🔥 High Risk", "top_danger": "☠️ ESCAPE NOW"
    },
    "zh": {
        "daily": "⚡ 每日定投 (Ahr < 0.3)", "weekly": "📅 每周定投 (Ahr > 0.3)",
        "stop_high": "🚫 价格过高 (暂停买入)", "buy_1": "😐 正常定投 (买1份)",
        "buy_2": "🙂 低估区间 (买2份)", "buy_4": "😄 抄底区间 (买4份)",
        "buy_8": "🤩 极度低估 (买8份)", "buy_16": "💎 钻石底 (梭哈 16份)",
        "cant_buy_top": "☠️ 顶部确立 (禁止买入)", "safe": "✅ 安全区域",
        "elevated": "⚠️ 情绪升温", "high_risk": "🔥 高风险 (考虑止盈)", "top_danger": "☠️ 顶部预警 (快跑)"
    },
    "ja": {
        "daily": "⚡ 毎日積立 (< 0.3)", "weekly": "📅 毎週積立 (> 0.3)",
        "stop_high": "🚫 待機 (高値)", "buy_1": "😐 通常 (1倍)",
        "buy_2": "🙂 割安 (2倍)", "buy_4": "😄 買い場 (4倍)",
        "buy_8": "🤩 大チャンス (8倍)", "buy_16": "💎 底値 (16倍)",
        "cant_buy_top": "☠️ 天井 (購入停止)", "safe": "✅ 安全圏",
        "elevated": "⚠️ 加熱", "high_risk": "🔥 高リスク", "top_danger": "☠️ 逃げて"
    },
    "ko": {
        "daily": "⚡ 매일 투자 (< 0.3)", "weekly": "📅 매주 투자 (> 0.3)",
        "stop_high": "🚫 고점 (대기)", "buy_1": "😐 일반 (1배)",
        "buy_2": "🙂 저평가 (2배)", "buy_4": "😄 매수 구간 (4배)",
        "buy_8": "🤩 강력 매수 (8배)", "buy_16": "💎 다이아 바닥 (16배)",
        "cant_buy_top": "☠️ 고점 신호 (중지)", "safe": "✅ 안전 구간",
        "elevated": "⚠️ 과열 주의", "high_risk": "🔥 고위험", "top_danger": "☠️ 탈출 하세요"
    }
};

// 界面翻译
const translations = {
    "en": {
        app_name: "Crypto Tools", menu_home: "🏠 Dashboard", menu_backtest: "📉 Backtest",
        settings: "Settings", lang_sel: "Language", close: "Close",
        // Dashboard
        price_label: "Bitcoin Price", ahr_label: "Ahr999 Index", mayer_label: "Mayer Multiple (Sell)",
        calc_title: "Smart DCA Calculator", base_amt: "Base Amount (1 Unit)", invest_freq: "Frequency", invest_today: "Invest Today",
        // Backtest
        bt_title: "DCA Calculator", bt_desc: "Calculate crypto DCA returns with historical data.",
        bt_settings: "Parameters", bt_coin: "Symbol", bt_amount: "Amount", bt_start: "Start Date", bt_end: "End Date", bt_freq: "Frequency",
        bt_btn_reset: "Reset", bt_btn_calc: "Calculate",
        bt_res_title: "Results", bt_total_coins: "Total Coins", bt_est_profit: "Est. Profit", bt_invested: "Total Invested",
        bt_curr_val: "Current Value", bt_avg_price: "Avg Price", bt_count: "Count", bt_table_title: "Records", bt_download: "Download CSV",
        th_date: "Date", th_invest: "Invest", th_price: "Price", th_coins: "Coins", th_total_inv: "Total Inv", th_total_coins: "Total Coins", th_avg: "Avg Price"
    },
    "zh": {
        app_name: "花小寒工具箱", menu_home: "🏠 行情看板", menu_backtest: "📉 定投回测",
        settings: "设置", lang_sel: "语言", close: "关闭",
        price_label: "比特币现价", ahr_label: "Ahr999 指数 (抄底)", mayer_label: "卖出参考 (Mayer倍数)",
        calc_title: "智能定投计算器", base_amt: "基础金额 (1份)", invest_freq: "建议频率", invest_today: "本期应买入",
        bt_title: "加密货币定投收益计算器", bt_desc: "基于真实历史数据回测，智能计算定投 (DCA) 投资回报率",
        bt_settings: "回测参数设置", bt_coin: "定投币种", bt_amount: "定投金额", bt_start: "开始时间", bt_end: "结束时间", bt_freq: "定投频率",
        bt_btn_reset: "一键重置", bt_btn_calc: "立即回测结果",
        bt_res_title: "回测结果分析", bt_total_coins: "累计持仓", bt_est_profit: "预估收益", bt_invested: "投入本金",
        bt_curr_val: "当前价值", bt_avg_price: "持仓均价", bt_count: "定投次数", bt_table_title: "详细定投记录", bt_download: "下载记录 (.csv)",
        th_date: "日期", th_invest: "本期投入", th_price: "成交价", th_coins: "获得数量", th_total_inv: "累计投入", th_total_coins: "累计持仓", th_avg: "持仓均价"
    },
    "ja": {
        app_name: "仮想通貨ツール", menu_home: "🏠 市況ボード", menu_backtest: "📉 積立シミュレーション",
        settings: "設定", lang_sel: "言語", close: "閉じる",
        price_label: "BTC価格", ahr_label: "Ahr999 指数", mayer_label: "Mayer倍率 (売り)",
        calc_title: "積立計算機", base_amt: "基本額 (1単位)", invest_freq: "推奨頻度", invest_today: "今回の投資額",
        bt_title: "積立投資計算機", bt_desc: "過去データに基づくDCA収益シミュレーション",
        bt_settings: "パラメータ設定", bt_coin: "通貨", bt_amount: "投資額", bt_start: "開始日", bt_end: "終了日", bt_freq: "頻度",
        bt_btn_reset: "リセット", bt_btn_calc: "計算開始",
        bt_res_title: "分析結果", bt_total_coins: "保有数量", bt_est_profit: "予想収益", bt_invested: "投資総額",
        bt_curr_val: "現在価値", bt_avg_price: "平均単価", bt_count: "回数", bt_table_title: "詳細記録", bt_download: "CSVダウンロード",
        th_date: "日付", th_invest: "投資額", th_price: "価格", th_coins: "数量", th_total_inv: "累計投資", th_total_coins: "累計数量", th_avg: "平均単価"
    },
    "ko": {
        app_name: "암호화폐 도구", menu_home: "🏠 시세 현황", menu_backtest: "📉 DCA 백테스트",
        settings: "설정", lang_sel: "언어", close: "닫기",
        price_label: "비트코인 가격", ahr_label: "Ahr999 지수", mayer_label: "Mayer 배수",
        calc_title: "스마트 DCA 계산기", base_amt: "기본 금액 (1단위)", invest_freq: "추천 주기", invest_today: "금회 투자금",
        bt_title: "적립식 투자 계산기", bt_desc: "과거 데이터 기반 DCA 수익률 계산",
        bt_settings: "설정", bt_coin: "코인", bt_amount: "투자금", bt_start: "시작일", bt_end: "종료일", bt_freq: "주기",
        bt_btn_reset: "초기화", bt_btn_calc: "계산하기",
        bt_res_title: "분석 결과", bt_total_coins: "보유 수량", bt_est_profit: "예상 수익", bt_invested: "총 투자금",
        bt_curr_val: "현재 가치", bt_avg_price: "평단가", bt_count: "횟수", bt_table_title: "상세 기록", bt_download: "CSV 다운로드",
        th_date: "날짜", th_invest: "투자금", th_price: "가격", th_coins: "수량", th_total_inv: "누적 투자", th_total_coins: "누적 수량", th_avg: "평단가"
    }
};

let currentLang = localStorage.getItem('lang') || 'zh';
let currentCurrency = localStorage.getItem('currency') || 'USD';
let isDark = localStorage.getItem('theme') === 'dark';

// ==========================================
// 2. 初始化与实时汇率
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    injectNavigation(); 
    applySettings();
    await fetchRealRates(); // 启动时获取真实汇率
    
    if (window.pageInit) window.pageInit();
});

// 获取真实汇率 (Exchangerate-API 免费版)
async function fetchRealRates() {
    try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await res.json();
        
        // 更新汇率表
        if(data && data.rates) {
            if(data.rates.CNY) exchangeRates.CNY.rate = data.rates.CNY;
            if(data.rates.HKD) exchangeRates.HKD.rate = data.rates.HKD;
            if(data.rates.JPY) exchangeRates.JPY.rate = data.rates.JPY;
            if(data.rates.KRW) exchangeRates.KRW.rate = data.rates.KRW;
            console.log("汇率已更新:", exchangeRates);
            
            // 如果页面上有数据，立刻刷新显示
            if (window.refreshData) window.refreshData();
        }
    } catch (e) {
        console.warn("汇率获取失败，使用默认值", e);
    }
}

// 动态注入导航栏
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
                <option value="HKD">HKD (HK$)</option>
                <option value="JPY">JPY (JP¥)</option>
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
    
    const oldNav = document.getElementById('global-nav');
    if(oldNav) oldNav.remove();
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

// 核心：应用所有设置 (语言、货币、夜间模式)
function applySettings() {
    if (isDark) document.body.classList.add('dark-mode'); else document.body.classList.remove('dark-mode');
    
    // 强制同步下拉框状态
    const langSelect = document.getElementById('sidebar-lang'); 
    if(langSelect) langSelect.value = currentLang;
    
    const currSelect = document.getElementById('global-currency'); 
    if(currSelect) currSelect.value = currentCurrency;

    const t = translations[currentLang] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });

    // 触发页面的刷新逻辑
    if (window.refreshData) window.refreshData();
}

function changeLang(v) { currentLang = v; localStorage.setItem('lang', v); applySettings(); }
function changeCurrency(v) { currentCurrency = v; localStorage.setItem('currency', v); applySettings(); }
function toggleTheme() { isDark = !isDark; localStorage.setItem('theme', isDark ? 'dark' : 'light'); applySettings(); }

// 货币转换工具：输入USD，输出目标货币字符串
function formatMoney(amount) {
    if (amount === undefined || amount === null) return "--";
    const info = exchangeRates[currentCurrency] || exchangeRates["USD"];
    const val = amount * info.rate;
    // 日韩元不显示小数
    const digits = (currentCurrency === 'JPY' || currentCurrency === 'KRW') ? 0 : 2;
    return info.symbol + " " + val.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function getStatusText(key) {
    const t = statusTranslations[currentLang] || statusTranslations['en'];
    return t[key] || key;
}

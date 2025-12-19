/**
 * Crypto-Edge Common Core
 * 包含：多语言字典、导航栏注入、通用逻辑
 */

// 1. 多语言字典 (已补全所有缺失的页面词条)
const translations = {
    "en": {
        app_name: "Crypto Edge",
        menu_home: "🏠 Signal (Ahr999)",
        menu_backtest: "📈 Backtest (DCA)",
        menu_ledger: "📒 Ledger (Offline)",
        menu_market: "📊 Market Data",
        settings: "Settings", lang_sel: "Language", close: "Close",
        
        // 首页
        price_label: "Price", ahr_label: "Ahr999", mayer_label: "Mayer", 
        calc_title: "Calculator", base_amt: "Base", invest_freq: "Freq", invest_today: "Buy Now",
        
        // 回测页
        bt_title: "DCA Calculator", bt_desc: "Simulate historical investment returns",
        bt_settings: "Settings", bt_coin: "Symbol", bt_amount: "Amount", 
        bt_start: "Start Date", bt_end: "End Date", bt_freq: "Frequency",
        bt_btn_reset: "Reset", bt_btn_calc: "Calculate",
        bt_res_title: "Results", bt_total_coins: "Coins Accum.", bt_est_profit: "Profit",
        bt_count: "Trans. Count", bt_invested: "Total Invested", bt_curr_val: "Current Value", bt_avg_price: "Avg Price",
        bt_table_title: "Transaction Records", bt_download: "Download CSV",
        th_date: "Date", th_invest: "Invest", th_price: "Price", th_coins: "Coins", th_total_inv: "Total Inv", th_total_coins: "Total Coins", th_avg: "Avg Price",
        chart_single: "Coins Bought", chart_avg: "Avg Price", chart_mkt: "Market Price",

        // 账本页 (新增)
        ledger_title: "Private Ledger", total_net_worth: "Est. Net Worth", 
        my_assets: "My Assets", th_asset_coin: "Coin", th_asset_amt: "Amount", th_asset_cost: "Cost($)", th_asset_act: "Action",
        add_transaction: "Add Transaction", btn_add_ledger: "Add to Ledger", btn_backup: "📥 Backup Data (.json)",
        ledger_local_tip: "🔒 Data stored locally on device",

        // 行情页 (新增)
        market_title: "Market Data", market_overview: "Market Overview", market_desc: "Top Currencies & Exchange Data",
        exchange_title: "Exchange Status", ex_binance: "🟢 Binance: Operational", ex_okx: "🟢 OKX: Operational", ex_coinbase: "🟡 Coinbase: Maintenance"
    },
    "zh": {
        app_name: "Crypto Edge",
        menu_home: "🏠 囤币指标 (Ahr999)",
        menu_backtest: "📈 定投回测",
        menu_ledger: "📒 离线账本",
        menu_market: "📊 市场行情",
        settings: "设置", lang_sel: "语言", close: "关闭",

        // 首页
        price_label: "比特币现价", ahr_label: "Ahr999 指数", mayer_label: "Mayer 倍数",
        calc_title: "智能定投计算器", base_amt: "基础金额", invest_freq: "建议频率", invest_today: "本期应买入",

        // 回测页
        bt_title: "定投回测工具", bt_desc: "基于历史数据的定投收益模拟",
        bt_settings: "参数设置", bt_coin: "币种", bt_amount: "定投金额", 
        bt_start: "开始日期", bt_end: "结束日期", bt_freq: "定投频率",
        bt_btn_reset: "重置", bt_btn_calc: "开始计算",
        bt_res_title: "回测结果", bt_total_coins: "累计持币", bt_est_profit: "预估收益",
        bt_count: "定投次数", bt_invested: "总投入本金", bt_curr_val: "当前价值", bt_avg_price: "平均成本",
        bt_table_title: "定投记录明细", bt_download: "下载 CSV",
        th_date: "日期", th_invest: "投入", th_price: "价格", th_coins: "买入币量", th_total_inv: "累计投入", th_total_coins: "累计持币", th_avg: "平均成本",
        chart_single: "单次买入", chart_avg: "平均成本", chart_mkt: "市场价格",

        // 账本页 (新增)
        ledger_title: "私密离线账本", total_net_worth: "资产总估值", 
        my_assets: "我的持仓列表", th_asset_coin: "币种", th_asset_amt: "持币量", th_asset_cost: "成本($)", th_asset_act: "操作",
        add_transaction: "添加交易记录", btn_add_ledger: "写入账本", btn_backup: "📥 备份数据 (.json)",
        ledger_local_tip: "🔒 数据仅存储在本地设备",

        // 行情页 (新增)
        market_title: "市场行情", market_overview: "行情概览", market_desc: "主流币种实时数据",
        exchange_title: "交易所状态", ex_binance: "🟢 币安 (Binance): 运行正常", ex_okx: "🟢 欧易 (OKX): 运行正常", ex_coinbase: "🟡 Coinbase: 维护中"
    },
    "ja": { 
        app_name: "Crypto Edge", menu_home: "🏠 Ahr999指標", menu_backtest: "📈 積立シミュ", menu_ledger: "📒 資産帳簿", menu_market: "📊 市場データ", settings: "設定", lang_sel: "言語", close: "閉じる",
        price_label: "価格", ahr_label: "Ahr999", mayer_label: "Mayer", calc_title: "計算機", base_amt: "基本額", invest_freq: "頻度", invest_today: "投資額",
        ledger_title: "資産帳簿", total_net_worth: "総資産評価", my_assets: "保有資産", th_asset_coin: "通貨", th_asset_amt: "数量", th_asset_cost: "取得単価", th_asset_act: "操作",
        add_transaction: "取引追加", btn_add_ledger: "保存する", btn_backup: "📥 バックアップ", ledger_local_tip: "🔒 データは端末に保存されます",
        market_overview: "市場概況", market_desc: "主要通貨レート", exchange_title: "取引所ステータス", ex_binance: "🟢 Binance: 正常", ex_okx: "🟢 OKX: 正常", ex_coinbase: "🟡 Coinbase: メンテ中"
    },
    "ko": { 
        app_name: "Crypto Edge", menu_home: "🏠 투자 지표", menu_backtest: "📉 백테스트", menu_ledger: "📒 자산 장부", menu_market: "📊 시장 시세", settings: "설정", lang_sel: "언어", close: "닫기",
        price_label: "가격", ahr_label: "Ahr999", mayer_label: "Mayer", calc_title: "계산기", base_amt: "기본금액", invest_freq: "주기", invest_today: "투자금",
        ledger_title: "자산 장부", total_net_worth: "총 자산 가치", my_assets: "보유 자산", th_asset_coin: "코인", th_asset_amt: "수량", th_asset_cost: "평단가", th_asset_act: "관리",
        add_transaction: "거래 추가", btn_add_ledger: "장부에 쓰기", btn_backup: "📥 백업 다운로드", ledger_local_tip: "🔒 데이터는 로컬에만 저장됩니다",
        market_overview: "시장 현황", market_desc: "주요 코인 시세", exchange_title: "거래소 상태", ex_binance: "🟢 바이낸스: 정상", ex_okx: "🟢 OKX: 정상", ex_coinbase: "🟡 코인베이스: 점검"
    }
};

let currentLang = localStorage.getItem('lang') || 'zh';
let currentCurrency = localStorage.getItem('currency') || 'USD';
const exchangeRates = { "USD": 1, "CNY": 7.25 };

function injectNavigation() {
    if(document.getElementById('global-nav')) return;

    const navHTML = `
    <div id="global-nav" style="display:flex; justify-content:space-between; align-items:center; padding:15px 20px; background:var(--card-bg); border-bottom:1px solid rgba(0,0,0,0.05); position:sticky; top:0; z-index:50; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        <div style="display:flex; align-items:center; gap:15px;">
             <button onclick="toggleSidebar()" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--text); padding:0;">☰</button>
             <div style="font-weight:bold; font-size:18px;">🚀 <span data-i18n="app_name">Crypto Edge</span></div>
        </div>
        <div style="display:flex; gap:10px;">
             <select id="global-currency" onchange="changeCurrency(this.value)" style="padding:5px; border-radius:6px; border:1px solid #ddd; background:var(--bg); color:var(--text);">
                <option value="USD" ${currentCurrency === 'USD' ? 'selected' : ''}>USD ($)</option>
                <option value="CNY" ${currentCurrency === 'CNY' ? 'selected' : ''}>CNY (¥)</option>
            </select>
            <button onclick="toggleTheme()" style="background:none; border:none; font-size:18px; cursor:pointer;">🌗</button>
        </div>
    </div>

    <div id="sidebar-overlay" onclick="toggleSidebar()" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:none; z-index:998;"></div>
    
    <div id="sidebar" style="position:fixed; top:0; left:0; width:250px; height:100%; background:var(--card-bg); transition:transform 0.3s ease; transform: translateX(-100%); z-index:999; padding:20px; padding-bottom:80px; box-sizing: border-box; box-shadow:2px 0 10px rgba(0,0,0,0.1); display:flex; flex-direction:column; overflow-y: auto;">
        <h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:15px; color:var(--text);" data-i18n="settings">Settings</h3>
        
        <a href="index.html" class="nav-link" data-i18n="menu_home">🏠 Signal</a>
        <a href="ledger.html" class="nav-link" data-i18n="menu_ledger">📒 Ledger</a>
        <a href="backtest.html" class="nav-link" data-i18n="menu_backtest">📉 Backtest</a>
        <a href="market.html" class="nav-link" data-i18n="menu_market">📊 Market</a>

        <div style="margin-top:auto; border-top:1px solid #eee; padding-top:20px;">
            <label style="display:block; margin-bottom:5px; font-size:12px; opacity:0.7; color:var(--text);" data-i18n="lang_sel">Language</label>
            <select id="sidebar-lang" onchange="changeLang(this.value)" style="width:100%; padding:8px; margin-bottom:15px; border-radius:6px; background:var(--bg); color:var(--text); border:1px solid #ddd;">
                <option value="zh" ${currentLang === 'zh' ? 'selected' : ''}>中文</option>
                <option value="en" ${currentLang === 'en' ? 'selected' : ''}>English</option>
                <option value="ja" ${currentLang === 'ja' ? 'selected' : ''}>日本語</option>
                <option value="ko" ${currentLang === 'ko' ? 'selected' : ''}>한국어</option>
            </select>
            <button onclick="toggleSidebar()" style="width:100%; padding:10px; background:var(--bg); border:1px solid #ddd; border-radius:6px; cursor:pointer; color:var(--text);" data-i18n="close">Close</button>
        </div>
    </div>
    <style>
        .nav-link { display:block; padding:12px 0; text-decoration:none; color:var(--text); font-weight:bold; font-size:16px; border-bottom:1px solid rgba(0,0,0,0.05); } 
        .nav-link:hover { color: var(--accent); padding-left: 5px; transition: 0.2s; }
    </style>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    applySettings();
}

function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    const ol = document.getElementById('sidebar-overlay');
    const isOpen = sb.style.transform === 'translateX(0%)';
    sb.style.transform = isOpen ? 'translateX(-100%)' : 'translateX(0%)';
    ol.style.display = isOpen ? 'none' : 'block';
}

function changeLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applySettings();
    if(window.refreshData) window.refreshData(); 
}

function changeCurrency(curr) {
    currentCurrency = curr;
    localStorage.setItem('currency', curr);
    if(window.refreshData) window.refreshData();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if(window.refreshData) window.refreshData();
}

function applySettings() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[currentLang] && translations[currentLang][key]) {
            el.innerText = translations[currentLang][key];
        }
    });
    if(localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
}

function formatMoney(amount) {
    const rate = exchangeRates[currentCurrency] || 1;
    const symbol = currentCurrency === 'USD' ? '$' : '¥';
    const val = parseFloat(amount) * rate;
    return symbol + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getStatusText(statusKey) {
    const map = {
        "wait": { en: "Wait", zh: "观望" },
        "buy_1": { en: "Buy (1x)", zh: "定投 (1份)" },
        "buy_2": { en: "Buy (2x)", zh: "抄底 (2份)" },
        "buy_4": { en: "Buy (4x)", zh: "抄底 (4份)" },
        "top_danger": { en: "Escape Top!", zh: "顶部预警 (快跑)" },
        "weekly": { en: "Weekly", zh: "每周" },
        "daily": { en: "Daily", zh: "每日" }
    };
    const item = map[statusKey];
    if(!item) return statusKey;
    return currentLang === 'zh' ? item.zh : item.en;
}

document.addEventListener('DOMContentLoaded', () => {
    injectNavigation();
    if(window.pageInit) window.pageInit();
});

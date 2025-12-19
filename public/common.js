// 翻译字典：包含10种语言
const translations = {
    "en": {
        title: "Hua Xiaohan - Crypto Investment Tools",
        desc: "Professional Ahr999 & Bitcoin DCA Analysis Tool",
        price: "Bitcoin Price",
        ahr_label: "Ahr999 Index (Bottom)",
        mayer_label: "Mayer Multiple (Top)",
        strategy: "Strategy",
        calc_title: "Smart DCA Calculator",
        base_amt: "Base Amount (1 Unit)",
        buy_this_round: "Invest Today",
        refresh: "Refresh Data",
        disclaimer_title: "Disclaimer",
        disclaimer_text: "The data provided on 'Hua Xiaohan' is for reference only and does not constitute financial advice. Cryptocurrency trading involves high risks. Please do your own research (DYOR) before investing.",
        status_all_in: "💎 Diamond Bottom (16x)",
        status_heavy_buy: "🤩 Opportunity (8x)",
        status_buy: "😄 Undervalued (4x)",
        status_light_buy: "🙂 Low Zone (2x)",
        status_dca: "😐 Normal Zone (1x)",
        status_hold: "👀 Wait & See",
        status_sell_zone: "🚫 Stop Buying",
        sell_safe: "✅ Safe Zone",
        sell_elevated: "⚠️ Heating Up",
        sell_high_risk: "🔥 High Risk (Consider Selling)",
        sell_top_danger: "☠️ MVRV-Z Peak (Escape Now)"
    },
    "zh": {
        title: "花小寒 - 加密货币定投助手",
        desc: "专业的 Ahr999 指数与比特币定投分析工具",
        price: "比特币现价",
        ahr_label: "Ahr999 指数 (抄底)",
        mayer_label: "卖出参考指标 (Mayer)",
        strategy: "当前策略",
        calc_title: "智能定投计算器",
        base_amt: "基础金额 (1份)",
        buy_this_round: "本期应投",
        refresh: "刷新数据",
        disclaimer_title: "免责声明",
        disclaimer_text: "“花小寒”提供的数据仅供参考，不构成任何投资建议。加密货币交易具有极高风险，市场波动剧烈。请在做出任何投资决定前自行研究 (DYOR)。",
        status_all_in: "💎 钻石底 (梭哈 16倍)",
        status_heavy_buy: "🤩 极度低估 (8倍)",
        status_buy: "😄 抄底区 (4倍)",
        status_light_buy: "🙂 低估区 (2倍)",
        status_dca: "😐 正常定投 (1倍)",
        status_hold: "👀 观望持有",
        status_sell_zone: "🚫 停止买入",
        sell_safe: "✅ 安全区域",
        sell_elevated: "⚠️ 情绪升温",
        sell_high_risk: "🔥 高风险 (考虑止盈)",
        sell_top_danger: "☠️ 顶部预警 (快跑)"
    },
    "zh-TW": {
        title: "花小寒 - 加密貨幣定投助手",
        desc: "專業的 Ahr999 指數與比特幣定投分析工具",
        price: "比特幣現價",
        ahr_label: "Ahr999 指數 (抄底)",
        mayer_label: "賣出參考指標 (Mayer)",
        strategy: "當前策略",
        calc_title: "智能定投計算機",
        base_amt: "基礎金額 (1份)",
        buy_this_round: "本期應投",
        refresh: "刷新數據",
        disclaimer_title: "免責聲明",
        disclaimer_text: "「花小寒」提供的數據僅供參考，不構成任何投資建議。加密貨幣交易具有極高風險，市場波動劇烈。請在做出任何投資決定前自行研究 (DYOR)。",
        status_all_in: "💎 鑽石底 (梭哈 16倍)",
        status_heavy_buy: "🤩 極度低估 (8倍)",
        status_buy: "😄 抄底區 (4倍)",
        status_light_buy: "🙂 低估區 (2倍)",
        status_dca: "😐 正常定投 (1倍)",
        status_hold: "👀 觀望持有",
        status_sell_zone: "🚫 停止買入",
        sell_safe: "✅ 安全區域",
        sell_elevated: "⚠️ 情緒升溫",
        sell_high_risk: "🔥 高風險 (考慮止盈)",
        sell_top_danger: "☠️ 頂部預警 (快跑)"
    },
    "ja": {
        title: "花小寒 (Hua Xiaohan) - 仮想通貨ツール",
        desc: "Ahr999指数とビットコイン積立投資分析",
        price: "現在の価格",
        ahr_label: "Ahr999 指数 (買い)",
        mayer_label: "売りシグナル (Mayer)",
        strategy: "戦略",
        calc_title: "積立計算機",
        base_amt: "基本額 (1単位)",
        buy_this_round: "今回の投資額",
        refresh: "更新",
        disclaimer_title: "免責事項",
        disclaimer_text: "本サイトのデータは参照用であり、投資助言ではありません。暗号資産取引は高いリスクを伴います。投資は自己責任(DYOR)で行ってください。",
        status_all_in: "💎 底値圏 (16倍)",
        status_heavy_buy: "🤩 大チャンス (8倍)",
        status_buy: "😄 割安 (4倍)",
        status_light_buy: "🙂 買い時 (2倍)",
        status_dca: "😐 通常 (1倍)",
        status_hold: "👀 待機",
        status_sell_zone: "🚫 購入停止",
        sell_safe: "✅ 安全圏",
        sell_elevated: "⚠️ 加熱気味",
        sell_high_risk: "🔥 高リスク (利確検討)",
        sell_top_danger: "☠️ 天井圏 (逃げて)"
    },
    "ko": {
        title: "화샤오한 (Hua Xiaohan) - 암호화폐 도구",
        desc: "비트코인 Ahr999 지수 및 DCA 분석",
        price: "현재 가격",
        ahr_label: "Ahr999 지수 (매수)",
        mayer_label: "매도 지표 (Mayer)",
        strategy: "투자 전략",
        calc_title: "스마트 DCA 계산기",
        base_amt: "기본 투자금 (1유닛)",
        buy_this_round: "이번 회차 투자금",
        refresh: "새로고침",
        disclaimer_title: "면책 조항",
        disclaimer_text: "제공된 데이터는 참고용이며 재정적 조언이 아닙니다. 암호화폐 투자는 높은 위험을 수반합니다. 투자 전 반드시 스스로 조사(DYOR)하십시오.",
        status_all_in: "💎 바닥권 (16배)",
        status_heavy_buy: "🤩 강력 매수 (8배)",
        status_buy: "😄 저평가 (4배)",
        status_light_buy: "🙂 매수 구간 (2배)",
        status_dca: "😐 일반 (1배)",
        status_hold: "👀 관망",
        status_sell_zone: "🚫 매수 중지",
        sell_safe: "✅ 안전 구간",
        sell_elevated: "⚠️ 과열 주의",
        sell_high_risk: "🔥 고위험 (매도 고려)",
        sell_top_danger: "☠️ 최고점 경고 (탈출)"
    },
    // 其他语言预留 (西班牙, 俄语, 德语, 法语, 越南语)
    "es": { title: "Hua Xiaohan - Herramientas Crypto", price: "Precio BTC", strategy: "Estrategia", refresh: "Actualizar", disclaimer_title: "Descargo de responsabilidad", disclaimer_text: "No es asesoramiento financiero. DYOR." },
    "ru": { title: "Хуа Сяохань - Крипто инструменты", price: "Цена BTC", strategy: "Стратегия", refresh: "Обновить", disclaimer_title: "Отказ от ответственности", disclaimer_text: "Не является финансовым советом. DYOR." },
    "de": { title: "Hua Xiaohan - Krypto-Tools", price: "BTC Preis", strategy: "Strategie", refresh: "Aktualisieren", disclaimer_title: "Haftungsausschluss", disclaimer_text: "Keine Finanzberatung. DYOR." },
    "fr": { title: "Hua Xiaohan - Outils Crypto", price: "Prix BTC", strategy: "Stratégie", refresh: "Actualiser", disclaimer_title: "Avis de non-responsabilité", disclaimer_text: "Ceci n'est pas un conseil financier. DYOR." },
    "vi": { title: "Hua Xiaohan - Công cụ Tiền điện tử", price: "Giá BTC", strategy: "Chiến lược", refresh: "Làm mới", disclaimer_title: "Tuyên bố miễn trừ", disclaimer_text: "Không phải lời khuyên tài chính. DYOR." }
};

// 当前语言
let currentLang = 'zh';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 1. 检查浏览器语言或上次选择
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        currentLang = savedLang;
    } else {
        // 自动检测浏览器语言
        const browserLang = navigator.language.slice(0, 2);
        if (translations[browserLang]) currentLang = browserLang;
    }
    
    // 2. 设置下拉框的值
    document.getElementById('lang-select').value = currentLang;
    
    // 3. 应用翻译
    applyTranslation();
    
    // 4. 夜间模式
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// 切换语言
function changeLang() {
    const select = document.getElementById('lang-select');
    currentLang = select.value;
    localStorage.setItem('lang', currentLang);
    applyTranslation();
    fetchData(); // 重新加载数据以更新状态文字
}

// 应用翻译到页面
function applyTranslation() {
    const t = translations[currentLang] || translations['en'];
    
    // 更新页面标题
    document.title = t.title;
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });

    // 还有一些 meta description 的 SEO 优化也可以在这里动态改，但爬虫主要看静态HTML
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

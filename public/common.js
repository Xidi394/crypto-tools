// 当页面加载完成时执行
document.addEventListener('DOMContentLoaded', () => {
    console.log("Crypto Tools 系统已启动...");
    
    // 检查是否有夜间模式的记录
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
});

// 切换夜间模式的函数
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    // 记住用户的选择
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

const themeToggleBtn = document.querySelector('.theme-toggle-btn');

themeToggleBtn.addEventListener('click', () => {
    if(document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
    } else {
        document.body.classList.add('dark-theme');
    }
});
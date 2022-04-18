const themeToggleBtn = document.querySelector('.theme-toggle-btn');
const moonIcon = document.querySelector('.moon-icon');

themeToggleBtn.addEventListener('click', () => {
    if(document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
    } else {
        document.body.classList.add('dark-theme');
    }
});
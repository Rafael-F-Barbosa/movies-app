const menu_icon = document.querySelector('.menu_toggle');
const navigationMobile = document.querySelector('.navigation_mobile');
const navigationBar = document.querySelector('.main_header');

menu_icon.addEventListener('click', () => {
	navigationMobile.classList.toggle('hide');
});
menu_icon.addEventListener('click', () => {
	navigationBar.classList.toggle('open');
});

const burgerBtn = document.querySelector('.navbar__icon');
const navbarWrapper = document.querySelector('.navbar__wrapper');

export function toggle () {
  navbarWrapper.classList.toggle('burger-active');
  document.body.classList.toggle('_lock');
}

burgerBtn.addEventListener('click', toggle);

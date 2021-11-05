let navToggle = document.querySelector('.hamburger-icon');
let navMenu = document.querySelector('#nav-menu');

navToggle.addEventListener('click', () => {
  console.log('clicked');
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});
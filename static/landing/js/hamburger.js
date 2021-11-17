var navToggle = document.querySelector(".hamburger-icon");
var navMenu = document.querySelector("#nav-menu");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

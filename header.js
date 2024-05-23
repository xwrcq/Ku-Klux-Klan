const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  let yPosition = window.scrollY;
  if (yPosition > 40) {
    header.classList.add("header-scroll");
  } else {
    header.classList.remove("header-scroll");
  }
});
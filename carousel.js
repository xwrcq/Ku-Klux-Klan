const multiplier = {
  translate: 0.1,
  rotate: 0.01,
};

new Swiper(".swiper", {
  slidesPerView: "auto",
  spaceBetween: 90,
  centeredSlides: true,
  loop: true,
  grabCursor: true,
  autoplay: {
    delay: 5000,
  }
});

function calculateWheel() {
  const slides = document.querySelectorAll(".single");
  slides.forEach((slide, i) => {
    const rect = slide.getBoundingClientRect();
    const r = window.innerWidth * 0.5 - (rect.x + rect.width * 0.5);
    let ty =
      Math.abs(r) * multiplier.translate - rect.width * multiplier.translate;

    if (ty < 0) {
      ty = 0;
    }
    const transformOrigin = r < 0 ? "left top" : "right top";
    slide.style.transform = `translate(0, ${ty}px) rotate(${
      -r * multiplier.rotate
    }deg)`;
    slide.style.transformOrigin = transformOrigin;
  });
}

function raf() {
  requestAnimationFrame(raf);
  calculateWheel();
}

raf();
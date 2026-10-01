const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");

function setMenu(isOpen) {
  mainNav.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

menuButton.addEventListener("click", () => {
  setMenu(!mainNav.classList.contains("is-open"));
});

mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

const newsletterForm = document.querySelector(".newsletter-form");
const newsletterMessage = document.querySelector(".newsletter-message");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletterForm.reset();
  newsletterMessage.textContent = "ご登録ありがとうございます。";
});

// With the OS "reduce motion" setting on, everything still fades in but nothing slides or zooms
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scrollReveal = ScrollReveal({
  distance: "30px",
  duration: 1000,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  cleanup: true,
  // cleanup leaves the generated inline styles behind, and they would pin the mobile hero
  // image's translateX(-35%) to its load-time pixels and block the .mosaic-image hover zoom
  afterReveal: (el) => {
    ["opacity", "transform", "transition"].forEach((prop) => el.style.removeProperty(prop));
  }
});

function reveal(selector, options) {
  scrollReveal.reveal(selector, reduceMotion ? { ...options, distance: "0px", scale: 1 } : options);
}

// ScrollReveal only reads interval from each reveal() call, not from the instance defaults
const interval = 120;

reveal(".reveal", { interval });
reveal(".reveal-left", { origin: "left", distance: "40px", interval });
reveal(".reveal-right", { origin: "right", distance: "40px", interval });
reveal(".reveal-zoom", { distance: "0px", scale: 0.94, duration: 1400, interval });
// Fade only: a transform on .site-header would trap its fixed mobile menu inside it
reveal(".reveal-fade", { distance: "0px", duration: 1400 });

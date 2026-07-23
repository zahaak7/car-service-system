/* =========================================================
   REDLINE AUTO CARE — home.js
   Home page: stats counter, testimonials carousel, back-to-top
   Owner: Person 1 (M4)
   ========================================================= */

/* ---------- Back to top ---------- */
function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 400);
  });
  
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- Animated stat counters ---------- */
function initCounters() {
  const nums = document.querySelectorAll(".stat-number");
  if (!nums.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.target);
    const decimals = el.dataset.target.includes(".") ? 1 : 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  
  nums.forEach((n) => observer.observe(n));
}

/* ---------- Testimonials carousel ---------- */
function initTestimonials() {
  const track = document.querySelector(".testimonial-track");
  if (!track) return;
  
  const slides = track.querySelectorAll(".testimonial-slide");
  const dotsWrap = document.querySelector(".testimonial-dots");
  const prevBtn = document.querySelector(".testimonial-controls .prev");
  const nextBtn = document.querySelector(".testimonial-controls .next");
  let index = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsWrap.querySelectorAll("button").forEach((d, di) => 
      d.classList.toggle("active", di === index)
    );
  }

  // Event listeners
  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  // Auto-play
  let timer = setInterval(() => goTo(index + 1), 6000);
  
  const wrap = track.closest(".testimonial-wrap");
  wrap.addEventListener("mouseenter", () => clearInterval(timer));
  wrap.addEventListener("mouseleave", () => {
    timer = setInterval(() => goTo(index + 1), 6000);
  });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".fade-up");
  if (!items.length) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  
  items.forEach((i) => observer.observe(i));
}

// Initialize all home features
function initHome() {
  initBackToTop();
  initCounters();
  initTestimonials();
  initScrollReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHome);
} else {
  initHome();
}
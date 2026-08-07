
function initFAQ() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      
      // Close all others
      items.forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".faq-answer").style.maxHeight = null;
      });
      
      // Open this one if it was closed
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* ---------- Contact form validation ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    valid = validateField(form.name, (v) => v.trim().length > 1, "Enter your name") && valid;
    valid = validateField(form.email, (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email") && valid;
    valid = validateField(form.subject, (v) => v.trim().length > 2, "Enter a subject") && valid;
    valid = validateField(form.message, (v) => v.trim().length > 9, "Message should be at least 10 characters") && valid;

    const successBox = document.getElementById("contact-success");
    if (valid) {
      successBox.textContent = "✓ Message sent — we'll get back to you within one business day.";
      successBox.style.display = "block";
      form.reset();
    } else {
      successBox.style.display = "none";
    }
  });
}

function validateField(input, testFn, message) {
  const field = input.closest(".form-field");
  const errorEl = field.querySelector(".form-error");
  const ok = testFn(input.value);
  field.classList.toggle("invalid", !ok);
  if (errorEl) errorEl.textContent = ok ? "" : message;
  return ok;
}

// Initialize about page features
function initAbout() {
  initFAQ();
  initContactForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAbout);
} else {
  initAbout();
}
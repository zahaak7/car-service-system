

function initBookingForm() {
  const form = document.getElementById("booking-form");
  const serviceSelect = document.getElementById("service-type");
  const dateInput = document.getElementById("preferred-date");
  const confirmBox = document.getElementById("booking-confirm");

  // Populate service dropdown
  serviceSelect.innerHTML = `
    <option value="" disabled selected>Choose a service&hellip;</option>
    ${SERVICES.map((s) => `<option value="${s.id}">${s.name}</option>`).join("")}
  `;

  // Pre-select from URL parameter
  const params = new URLSearchParams(window.location.search);
  const preselect = params.get("service");
  if (preselect && SERVICES.some((s) => s.id === preselect)) {
    serviceSelect.value = preselect;
  }

  // Restrict date picker to today or later
  dateInput.min = new Date().toISOString().split("T")[0];

  // Update gauge on service change
  serviceSelect.addEventListener("change", () => updateGauge(serviceSelect.value));

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateBookingForm(form)) return;

    const service = SERVICES.find((s) => s.id === serviceSelect.value);
    const booking = {
      id: generateOrderNumber(),
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      vehicle: form.vehicle.value.trim(),
      serviceId: service.id,
      serviceName: service.name,
      date: form.date.value,
      time: form.time.value,
      notes: form.notes.value.trim(),
    };

    saveBooking(booking);
    renderBookings();
    showConfirmation(booking, service);
    form.reset();
    serviceSelect.value = "";
    updateGauge("");
  });
}

function validateBookingForm(form) {
  let valid = true;
  valid = validateBookingField(form.name, (v) => v.trim().length > 1, "Enter your full name") && valid;
  valid = validateBookingField(form.phone, (v) => /^[0-9+()\-\s]{7,}$/.test(v), "Enter a valid phone number") && valid;
  valid = validateBookingField(form.email, (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email") && valid;
  valid = validateBookingField(form.vehicle, (v) => v.trim().length > 1, "Enter your vehicle make & model") && valid;
  valid = validateBookingField(
    document.getElementById("service-type"), 
    (v) => v !== "", 
    "Choose a service"
  ) && valid;
  valid = validateBookingField(form.date, (v) => v !== "", "Pick a date") && valid;
  valid = validateBookingField(form.time, (v) => v !== "", "Pick a time slot") && valid;
  return valid;
}

function validateBookingField(input, testFn, message) {
  const field = input.closest(".form-field");
  const errorEl = field.querySelector(".form-error");
  const ok = testFn(input.value);
  field.classList.toggle("invalid", !ok);
  if (errorEl) errorEl.textContent = ok ? "" : message;
  return ok;
}

function showConfirmation(booking, service) {
  const box = document.getElementById("booking-confirm");
  box.innerHTML = `
    <div class="ticket">
      <div class="ticket-stub">
        <span>ORDER #${booking.id}</span>
        <span class="ticket-badge">CONFIRMED</span>
      </div>
      <div class="ticket-body">
        <div class="ticket-row"><span>Service</span><span>${service.name}</span></div>
        <div class="ticket-row"><span>Vehicle</span><span>${booking.vehicle}</span></div>
        <div class="ticket-row"><span>Date</span><span>${booking.date}</span></div>
        <div class="ticket-row"><span>Time</span><span>${booking.time}</span></div>
        <div class="ticket-row"><span>Estimate</span><span>$${service.priceMin}&ndash;$${service.priceMax}</span></div>
      </div>
    </div>`;
  box.style.display = "block";
  box.scrollIntoView({ behavior: "smooth", block: "center" });
}
// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBookingForm);
} else {
    initBookingForm();
}

// Wait for everything (including SERVICES) to load
window.addEventListener('load', function() {
    console.log('📄 Page fully loaded');
    
    // Check if SERVICES exists
    if (typeof SERVICES === 'undefined') {
        console.error('❌ SERVICES not loaded!');
        return;
    }
    
    console.log('✅ SERVICES found, initializing form...');
    initBookingForm();
});
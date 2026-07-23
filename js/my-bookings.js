/* =========================================================
   REDLINE AUTO CARE — my-bookings.js
   Display bookings list with cancel functionality
   Owner: Person 2 (M12)
   ========================================================= */

function renderBookings() {
  const list = document.getElementById("my-bookings-list");
  if (!list) return;
  
  const bookings = loadBookings();

  if (!bookings.length) {
    list.innerHTML = `
      <p class="text-muted" style="font-size:14px;">
        No bookings yet — pick a service and grab a slot above.
      </p>`;
    return;
  }

  list.innerHTML = bookings
    .map(
      (b) => `
      <div class="booking-item">
        <div>
          <div>${b.serviceName}</div>
          <div class="meta">${b.date} · ${b.time} · #${b.id}</div>
        </div>
        <button data-id="${b.id}">Cancel</button>
      </div>`
    )
    .join("");

  list.querySelectorAll("button[data-id]").forEach((btn) =>
    btn.addEventListener("click", () => {
      removeBooking(btn.dataset.id);
      renderBookings();
    })
  );
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderBookings);
} else {
  renderBookings();
}
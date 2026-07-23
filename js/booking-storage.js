/* =========================================================
   REDLINE AUTO CARE — booking-storage.js
   localStorage CRUD operations for bookings
   Owner: Person 2 (M11)
   ========================================================= */

const BOOKINGS_KEY = "redline_bookings";

function loadBookings() {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveBooking(booking) {
  const bookings = loadBookings();
  bookings.unshift(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

function removeBooking(id) {
  const bookings = loadBookings().filter((b) => b.id !== id);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

function generateOrderNumber() {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `WO-${rand}-${year}`;
}

// Make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { loadBookings, saveBooking, removeBooking, generateOrderNumber };
}
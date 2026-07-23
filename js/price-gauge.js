/* =========================================================
   REDLINE AUTO CARE — price-gauge.js
   Live price estimate with animated gauge
   Owner: Person 2 (M10)
   ========================================================= */

function updateGauge(serviceId) {
  const gauge = document.querySelector(".gauge");
  const amountEl = document.querySelector(".gauge-readout .amount");
  const durationEl = document.querySelector(".gauge-readout .duration");
  if (!gauge) return;

  const service = SERVICES.find((s) => s.id === serviceId);
  const maxPossible = Math.max(...SERVICES.map((s) => s.priceMax));

  if (!service) {
    animateGauge(gauge, 0);
    amountEl.textContent = "$0";
    durationEl.textContent = "Select a service";
    return;
  }

  const midPrice = Math.round((service.priceMin + service.priceMax) / 2);
  const pct = Math.round((midPrice / maxPossible) * 100);
  animateGauge(gauge, pct);
  amountEl.textContent = `~$${midPrice}`;
  durationEl.textContent = `Approx. ${service.duration}`;
}

function animateGauge(gauge, targetPct) {
  const current = parseFloat(gauge.style.getPropertyValue("--gauge-pct")) || 0;
  const start = performance.now();
  const duration = 500;

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = current + (targetPct - current) * progress;
    gauge.style.setProperty("--gauge-pct", value.toFixed(1));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { updateGauge, animateGauge };
}
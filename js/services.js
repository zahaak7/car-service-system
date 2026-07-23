/* =========================================================
   REDLINE AUTO CARE — services.js
   Services page: render, search, filter
   Owner: Person 2 (M8)
   ========================================================= */

function initServicesPage() {
  const grid = document.getElementById("services-grid");
  const searchInput = document.getElementById("service-search");
  const tagButtons = document.querySelectorAll(".filter-tag");
  const emptyState = document.getElementById("services-empty");

  // Pre-fill search from URL parameter
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("q") || "";
  if (initialQuery) searchInput.value = initialQuery;

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    const activeTag = document.querySelector(".filter-tag.active").dataset.filter;

    const filtered = SERVICES.filter((s) => {
      const matchesQuery = !query || 
        s.name.toLowerCase().includes(query) || 
        s.desc.toLowerCase().includes(query);
      const matchesTag = activeTag === "All" || s.category === activeTag;
      return matchesQuery && matchesTag;
    });

    grid.innerHTML = filtered.map(serviceCardHTML).join("");
    emptyState.style.display = filtered.length ? "none" : "block";
  }

  function serviceCardHTML(s) {
    return `
      <article class="service-card fade-up in">
        <div class="stub">
          <span class="service-icon"><i class="fa-solid ${s.icon}"></i></span>
          <span class="service-tag">${s.category}</span>
        </div>
        <div class="service-body">
          <h3>${s.name}</h3>
          <p>${s.desc}</p>
          <div class="service-meta">
            <span class="price">$${s.priceMin}&ndash;$${s.priceMax}</span>
            <span>${s.duration}</span>
          </div>
          <a class="btn btn-primary btn-block btn-sm" href="booking.html?service=${s.id}">
            Book This Service
          </a>
        </div>
      </article>`;
  }

  // Event listeners
  searchInput.addEventListener("input", render);
  
  tagButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      tagButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    })
  );

  render();
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initServicesPage);
} else {
  initServicesPage();
}
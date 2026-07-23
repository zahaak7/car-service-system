/* =========================================================
   REDLINE AUTO CARE — service-data.js
   Service catalogue data
   Owner: Person 2 (M7)
   ========================================================= */

const SERVICES = [
  { 
    id: "oil-change", 
    name: "Oil Change & Filter", 
    category: "Maintenance", 
    icon: "fa-oil-can",
    desc: "Full synthetic or conventional oil change with a new filter and 21-point check.",
    priceMin: 40, 
    priceMax: 70, 
    duration: "30 min" 
  },
  { 
    id: "tire-rotation", 
    name: "Tire Rotation & Balancing", 
    category: "Maintenance", 
    icon: "fa-sync-alt",
    desc: "Rotate and balance all four tires to even out tread wear and ride smoother.",
    priceMin: 35, 
    priceMax: 60, 
    duration: "45 min" 
  },
  { 
    id: "brake-service", 
    name: "Brake Inspection & Repair", 
    category: "Repair", 
    icon: "fa-wrench",
    desc: "Pad, rotor and fluid inspection with repair or replacement as needed.",
    priceMin: 90, 
    priceMax: 220, 
    duration: "90 min" 
  },
  { 
    id: "battery", 
    name: "Battery Check & Replacement", 
    category: "Repair", 
    icon: "fa-car-battery",
    desc: "Load test your battery and swap it on the spot if it's on its way out.",
    priceMin: 60, 
    priceMax: 150, 
    duration: "30 min" 
  },
  { 
    id: "ac-service", 
    name: "A/C Service & Regas", 
    category: "Maintenance", 
    icon: "fa-snowflake",
    desc: "Refrigerant top-up, leak check and full climate system inspection.",
    priceMin: 80, 
    priceMax: 160, 
    duration: "60 min" 
  },
  { 
    id: "diagnostics", 
    name: "Engine Diagnostics", 
    category: "Repair", 
    icon: "fa-microchip",
    desc: "Full OBD scan to trace warning lights back to their root cause.",
    priceMin: 50, 
    priceMax: 100, 
    duration: "45 min" 
  },
  { 
    id: "alignment", 
    name: "Wheel Alignment", 
    category: "Maintenance", 
    icon: "fa-arrows-alt-h",
    desc: "Four-wheel alignment to stop uneven wear and steering pull.",
    priceMin: 70, 
    priceMax: 120, 
    duration: "60 min" 
  },
  { 
    id: "wash-detail", 
    name: "Full Wash & Detailing", 
    category: "Detailing", 
    icon: "fa-car-side",
    desc: "Interior vacuum, wax and a hand wash that leaves it showroom-clean.",
    priceMin: 30, 
    priceMax: 90, 
    duration: "60 min" 
  }
];

// Make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SERVICES;
}
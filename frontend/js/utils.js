// ========== Star Rating Helper ==========

function renderStars(rating) {
  let html = '<span class="star-rating">';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += '<i class="fas fa-star"></i>';
    } else {
      html += '<i class="fas fa-star empty"></i>';
    }
  }
  html += "</span>";
  return html;
}

// ========== Status Badge Helper ==========

function renderStatusBadge(status) {
  const labels = {
    TBR: "TBR",
    READING: "Reading",
    READ: "Read",
    DNF: "DNF"
  };
  const badgeClass = "badge-" + status.toLowerCase();
  return `<span class="badge ${badgeClass}">${labels[status] || status}</span>`;
}

// ========== Active Navbar Link ==========

function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
// ========== Dashboard Stats ==========

function updateDashboardStats() {
  const books = getBooks();

  const total = books.length;
  const reading = books.filter(b => b.status === "READING").length;
  const read = books.filter(b => b.status === "READ").length;
  const tbr = books.filter(b => b.status === "TBR").length;

  const elTotal = document.getElementById("statTotal");
  const elReading = document.getElementById("statReading");
  const elRead = document.getElementById("statRead");
  const elTbr = document.getElementById("statTbr");

  if (elTotal) elTotal.textContent = total;
  if (elReading) elReading.textContent = reading;
  if (elRead) elRead.textContent = read;
  if (elTbr) elTbr.textContent = tbr;
}

// ========== Featured Books ==========

function renderFeaturedBooks() {
  const container = document.getElementById("featuredBooks");
  if (!container) return;

  const books = getBooks();
  const featured = books
    .filter(b => b.status === "READ" || b.status === "READING")
    .slice(0, 3);

  container.innerHTML = "";

  featured.forEach(book => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
      <div class="card book-card">
        <div class="card-body">
          <h5 class="book-title">${book.title}</h5>
          <p class="book-author">by ${book.author}</p>
          ${renderStatusBadge(book.status)}
          <div class="mt-2">${renderStars(book.rating)}</div>
          ${book.notes ? `<p class="mt-2 text-muted small">${book.notes}</p>` : ""}
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

// ========== Init ==========

document.addEventListener("DOMContentLoaded", function () {
  updateDashboardStats();
  renderFeaturedBooks();
});
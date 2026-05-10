// ========== DataTable ==========

let dataTable = null;

function initBooksTable() {
  const tableBody = document.getElementById("booksTableBody");
  if (!tableBody) return;

  renderBooksTable();

  dataTable = $("#booksTable").DataTable({
    responsive: true,
    pageLength: 10,
    order: [[0, "asc"]],
    language: {
      search: "Search books:",
      emptyTable: "No books in your library yet. Add one!",
      zeroRecords: "No matching books found."
    },
    columnDefs: [
      { orderable: false, targets: [4] }
    ]
  });
}

function renderBooksTable(filter) {
  const tableBody = document.getElementById("booksTableBody");
  if (!tableBody) return;

  let books = getBooks();

  if (filter && filter !== "ALL") {
    books = books.filter(b => b.status === filter);
  }

  tableBody.innerHTML = "";

  books.forEach(book => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${book.title}</strong></td>
      <td>${book.author}</td>
      <td>${renderStatusBadge(book.status)}</td>
      <td>${book.rating > 0 ? renderStars(book.rating) : '<span class="text-muted">N/A</span>'}</td>
      <td class="action-buttons">
        <button class="btn btn-sm btn-outline-primary" onclick="editBook(${book.id})" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="confirmDeleteBook(${book.id})" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function refreshTable(filter) {
  if (dataTable) {
    dataTable.destroy();
  }
  renderBooksTable(filter);
  dataTable = $("#booksTable").DataTable({
    responsive: true,
    pageLength: 10,
    order: [[0, "asc"]],
    language: {
      search: "Search books:",
      emptyTable: "No books in your library yet. Add one!",
      zeroRecords: "No matching books found."
    },
    columnDefs: [
      { orderable: false, targets: [4] }
    ]
  });
}

// ========== Filter Buttons ==========

function initFilterButtons() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", function () {
      buttons.forEach(b => b.classList.remove("active-filter"));
      this.classList.add("active-filter");
      const filter = this.getAttribute("data-filter");
      refreshTable(filter);
    });
  });
}

// ========== Add / Edit Modal ==========

function openAddBookModal() {
  document.getElementById("bookModalTitle").textContent = "Add New Book";
  document.getElementById("bookForm").reset();
  document.getElementById("bookId").value = "";
  const modal = new bootstrap.Modal(document.getElementById("bookModal"));
  modal.show();
}

function editBook(id) {
  const books = getBooks();
  const book = books.find(b => b.id === id);
  if (!book) return;

  document.getElementById("bookModalTitle").textContent = "Edit Book";
  document.getElementById("bookId").value = book.id;
  document.getElementById("bookTitle").value = book.title;
  document.getElementById("bookAuthor").value = book.author;
  document.getElementById("bookStatus").value = book.status;
  document.getElementById("bookRating").value = book.rating;
  document.getElementById("bookTargetDate").value = book.targetDate || "";
  document.getElementById("bookNotes").value = book.notes || "";

  const modal = new bootstrap.Modal(document.getElementById("bookModal"));
  modal.show();
}

function saveBook() {
  const title = document.getElementById("bookTitle").value.trim();
  const author = document.getElementById("bookAuthor").value.trim();
  const status = document.getElementById("bookStatus").value;
  const rating = parseInt(document.getElementById("bookRating").value) || 0;
  const targetDate = document.getElementById("bookTargetDate").value;
  const notes = document.getElementById("bookNotes").value.trim();
  const editId = document.getElementById("bookId").value;

  if (!title || !author || !status) {
    alert("Please fill in the Title, Author, and Status fields.");
    return;
  }

  let books = getBooks();

  if (editId) {
    const index = books.findIndex(b => b.id === parseInt(editId));
    if (index !== -1) {
      books[index] = { ...books[index], title, author, status, rating, targetDate, notes };
    }
  } else {
    const newBook = {
      id: generateId(),
      title,
      author,
      status,
      rating,
      targetDate,
      notes
    };
    books.push(newBook);
  }

  saveBooks(books);
  refreshTable("ALL");

  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active-filter"));
  const allBtn = document.querySelector('.filter-btn[data-filter="ALL"]');
  if (allBtn) allBtn.classList.add("active-filter");

  const modal = bootstrap.Modal.getInstance(document.getElementById("bookModal"));
  modal.hide();
}

// ========== Delete Modal ==========

let deleteBookId = null;

function confirmDeleteBook(id) {
  deleteBookId = id;
  const books = getBooks();
  const book = books.find(b => b.id === id);
  if (!book) return;

  document.getElementById("deleteBookTitle").textContent = book.title;
  const modal = new bootstrap.Modal(document.getElementById("deleteModal"));
  modal.show();
}

function deleteBook() {
  if (deleteBookId === null) return;

  let books = getBooks();
  books = books.filter(b => b.id !== deleteBookId);
  saveBooks(books);
  deleteBookId = null;

  refreshTable("ALL");

  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active-filter"));
  const allBtn = document.querySelector('.filter-btn[data-filter="ALL"]');
  if (allBtn) allBtn.classList.add("active-filter");

  const modal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
  modal.hide();
}

// ========== Init ==========

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("booksTable")) {
    initBooksTable();
    initFilterButtons();
  }
});
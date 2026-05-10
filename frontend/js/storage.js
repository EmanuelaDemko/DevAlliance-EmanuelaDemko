// ========== Sample Data ==========

const sampleBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    status: "READ",
    rating: 5,
    targetDate: "2026-01-15",
    notes: "A classic American novel. Loved the symbolism."
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    status: "READ",
    rating: 5,
    targetDate: "2025-12-01",
    notes: "Powerful story about justice and compassion."
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    status: "READING",
    rating: 4,
    targetDate: "2026-06-01",
    notes: "Currently on chapter 15. Very thought-provoking."
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    status: "TBR",
    rating: 0,
    targetDate: "2026-08-01",
    notes: "Recommended by my teacher."
  },
  {
    id: 5,
    title: "The Alchemist",
    author: "Paulo Coelho",
    status: "TBR",
    rating: 0,
    targetDate: "2026-07-15",
    notes: "Want to read this during summer break."
  },
  {
    id: 6,
    title: "Moby Dick",
    author: "Herman Melville",
    status: "DNF",
    rating: 2,
    targetDate: "2026-03-01",
    notes: "Too long and slow for me. May try again later."
  }
];

// ========== localStorage Helpers ==========

function getBooks() {
  let books = localStorage.getItem("libraryBooks");
  if (!books) {
    localStorage.setItem("libraryBooks", JSON.stringify(sampleBooks));
    return sampleBooks;
  }
  return JSON.parse(books);
}

function saveBooks(books) {
  localStorage.setItem("libraryBooks", JSON.stringify(books));
}

function generateId() {
  const books = getBooks();
  if (books.length === 0) return 1;
  return Math.max(...books.map(b => b.id)) + 1;
}
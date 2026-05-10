package com.myeverywherelibrary.controller;

import com.myeverywherelibrary.model.Book;
import com.myeverywherelibrary.model.BookStatus;
import com.myeverywherelibrary.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookService bookService;

    // GET /api/books - Get all books
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    // GET /api/books/{id} - Get book by id
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    // GET /api/books/user/{userId} - Get books by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Book>> getBooksByUserId(@PathVariable Long userId) {
        List<Book> books = bookService.getBooksByUserId(userId);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    // GET /api/books/status/{status} - Get books by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Book>> getBooksByStatus(@PathVariable BookStatus status) {
        List<Book> books = bookService.getBooksByStatus(status);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    // POST /api/books - Create book (userId passed as request parameter)
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestParam Long userId, @Valid @RequestBody Book book) {
        Book createdBook = bookService.createBook(userId, book);
        return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
    }

    // PUT /api/books/{id} - Update book
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @Valid @RequestBody Book book) {
        Book updatedBook = bookService.updateBook(id, book);
        return new ResponseEntity<>(updatedBook, HttpStatus.OK);
    }

    // DELETE /api/books/{id} - Delete book
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

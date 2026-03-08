package com.hemreozdes.book_management.controllers;

import com.hemreozdes.book_management.dtos.responses.BookResponse;
import com.hemreozdes.book_management.dtos.resquests.BookRequest;
import com.hemreozdes.book_management.security.SecurityUtils;
import com.hemreozdes.book_management.services.BookService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final SecurityUtils securityUtils;

    public BookController(BookService bookService,SecurityUtils securityUtils) {
        this.bookService = bookService;
        this.securityUtils = securityUtils;
    }

    @GetMapping
    public ResponseEntity<List<BookResponse>> getAllBooks() {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(bookService.getAllBooks(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> getBookById(@PathVariable Long id) {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(bookService.getBookById(userId, id));
    }

    @PostMapping
    public ResponseEntity<BookResponse> createBook(@Valid @RequestBody BookRequest request) {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.createBook(userId, request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookResponse> updateBook(@PathVariable Long id, @Valid @RequestBody BookRequest request) {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(bookService.updateBook(userId, id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        Long userId = securityUtils.getCurrentUserId();
        bookService.deleteBook(userId, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<BookResponse>> searchBooks(
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String title) {
        Long userId = securityUtils.getCurrentUserId();
        if (author != null) return ResponseEntity.ok(bookService.getBooksByAuthor(userId, author));
        if (genre != null) return ResponseEntity.ok(bookService.getBooksByGenre(userId, genre));
        if (title != null) return ResponseEntity.ok(bookService.getBooksByTitle(userId, title));
        return ResponseEntity.badRequest().build();
    }
}

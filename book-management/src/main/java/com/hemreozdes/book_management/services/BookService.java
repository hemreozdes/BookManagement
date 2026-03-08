package com.hemreozdes.book_management.services;

import com.hemreozdes.book_management.dtos.responses.BookResponse;
import com.hemreozdes.book_management.dtos.resquests.BookRequest;

import java.util.List;

public interface BookService {
    List<BookResponse> getAllBooks(Long userId);

    BookResponse getBookById(Long userId, Long bookId);

    BookResponse createBook(Long userId, BookRequest request);

    BookResponse updateBook(Long userId, Long bookId, BookRequest request);

    void deleteBook(Long userId, Long bookId);

    List<BookResponse> getBooksByAuthor(Long userId, String author);

    List<BookResponse> getBooksByGenre(Long userId, String genre);

    List<BookResponse> getBooksByTitle(Long userId, String title);
}

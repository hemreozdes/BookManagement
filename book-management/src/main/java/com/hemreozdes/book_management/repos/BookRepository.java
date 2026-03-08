package com.hemreozdes.book_management.repos;

import com.hemreozdes.book_management.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Long> {
    List<Book> findByUserId(Long userId);

    List<Book> findByUserIdAndAuthorContainingIgnoreCase(Long userId, String author);

    List<Book> findByUserIdAndGenreContainingIgnoreCase(Long userId, String genre);

    List<Book> findByUserIdAndTitleContainingIgnoreCase(Long userId, String title);
}

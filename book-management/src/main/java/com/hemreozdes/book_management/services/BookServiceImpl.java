package com.hemreozdes.book_management.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hemreozdes.book_management.dtos.helpers.BookDetails;
import com.hemreozdes.book_management.dtos.responses.BookResponse;
import com.hemreozdes.book_management.dtos.resquests.BookRequest;
import com.hemreozdes.book_management.entities.Book;
import com.hemreozdes.book_management.entities.User;
import com.hemreozdes.book_management.repos.BookRepository;
import com.hemreozdes.book_management.repos.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;



import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Value("${google.books.api.key}")
    private String googleBooksApiKey;

    public BookServiceImpl(BookRepository bookRepository, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
    }

    private Book getBookForUser(Long userId, Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Kitap bulunamadı"));
        if (!book.getUser().getId().equals(userId)) {
            throw new RuntimeException("Bu kitaba erişim yetkiniz yok");
        }
        return book;
    }

    private BookResponse toResponse(Book book) {
        return new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getGenre(),
                book.getDescription(),
                book.getPublishedYear()
        );
    }

    private BookDetails fetchBookDetails(String title, String author) {
        try {
            String query = URLEncoder.encode(title + " " + author, StandardCharsets.UTF_8);
            String url = "https://www.googleapis.com/books/v1/volumes?q=" + query + "&key="+ googleBooksApiKey;

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.body());
            JsonNode items = root.path("items");
            if (items.isArray() && items.size() > 0) {
                JsonNode volumeInfo = items.get(0).path("volumeInfo");
                String description = volumeInfo.path("description").asText(null);
                String publishedYear = volumeInfo.path("publishedDate").asText(null);
                if (publishedYear != null && publishedYear.length() >= 4) {
                    publishedYear = publishedYear.substring(0, 4);
                }
                JsonNode categories = volumeInfo.path("categories");
                String genre = null;
                if (categories.isArray() && categories.size() > 0) {
                    genre = categories.get(0).asText(null);
                }
                return new BookDetails(description, publishedYear, genre);
            }
        } catch (Exception e) {
            return new BookDetails(null, null, null);
        }
        return new BookDetails(null, null, null);
    }

    @Override
    public List<BookResponse> getAllBooks(Long userId) {
        return bookRepository.findByUserId(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BookResponse getBookById(Long userId, Long bookId) {
        return toResponse(getBookForUser(userId, bookId));
    }

    @Override
    public BookResponse createBook(Long userId, BookRequest request) {
        User user = getUser(userId);
        Book book = new Book(
                request.getTitle(),
                request.getAuthor(),
                user
        );
        BookDetails details = fetchBookDetails(request.getTitle(), request.getAuthor());
        book.setDescription(details.getDescription());
        book.setPublishedYear(details.getPublishedYear());
        book.setGenre(details.getGenre());
        return toResponse(bookRepository.save(book));
    }

    @Override
    public BookResponse updateBook(Long userId, Long bookId, BookRequest request) {
        Book book = getBookForUser(userId, bookId);
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        return toResponse(bookRepository.save(book));
    }

    @Override
    public void deleteBook(Long userId, Long bookId) {
        Book book = getBookForUser(userId, bookId);
        bookRepository.delete(book);
    }

    @Override
    public List<BookResponse> getBooksByAuthor(Long userId, String author) {
        return bookRepository.findByUserIdAndAuthorContainingIgnoreCase(userId, author)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookResponse> getBooksByGenre(Long userId, String genre) {
        return bookRepository.findByUserIdAndGenreContainingIgnoreCase(userId, genre)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookResponse> getBooksByTitle(Long userId, String title) {
        return bookRepository.findByUserIdAndTitleContainingIgnoreCase(userId, title)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}

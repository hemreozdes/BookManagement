package com.hemreozdes.book_management.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String author;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String genre;
    private String publishedYear;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Book() {
    }
    public Book(String title, String author, User user) {
        this.title = title;
        this.author = author;
        this.user = user;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getGenre() {
        return genre;
    }
    public void setGenre(String genre) {
        this.genre = genre;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public String getPublishedYear() {
        return publishedYear;
    }
    public void setPublishedYear(String publishedYear) {
        this.publishedYear = publishedYear;
    }
}

package com.hemreozdes.book_management.dtos.resquests;

import jakarta.validation.constraints.NotBlank;

public class BookRequest {
    @NotBlank(message = "Yazar adı boş olamaz")
    private String author;
    @NotBlank(message = "Kitap adı boş olamaz")
    private String title;

    public BookRequest() {
    }
    public BookRequest(String author, String title) {
        this.author = author;
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
}

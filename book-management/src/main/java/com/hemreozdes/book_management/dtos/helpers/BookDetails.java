package com.hemreozdes.book_management.dtos.helpers;

public class BookDetails {
    private String description;
    private String publishedYear;
    private String genre;

    public BookDetails() {
    }
    public BookDetails(String description, String publishedYear,String genre) {
        this.description = description;
        this.publishedYear = publishedYear;
        this.genre=genre;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getPublishedYear() {
        return publishedYear;
    }
    public void setPublishedYear(String publishedYear) {
        this.publishedYear = publishedYear;
    }

    public String getGenre() {
        return genre;
    }
    public void setGenre(String genre) {
        this.genre = genre;
    }
}

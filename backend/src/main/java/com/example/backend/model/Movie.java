package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Movie {

    @Id
    @Column(name = "name")
    private String name; // Primary key

    @Column(name = "image")
    private String image;

    private double rating;

    @Column(length = 100)
    private String language;

    @Column(length = 100)
    private String genre;

    @Column(length = 300)
    private String actors;

    @Column(length = 1000) // ~150 words
    private String description;

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getActors() { return actors; }
    public void setActors(String actors) { this.actors = actors; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}

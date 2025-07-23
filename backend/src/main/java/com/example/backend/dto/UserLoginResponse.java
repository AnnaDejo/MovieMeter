package com.example.backend.dto;

public class UserLoginResponse {
    private String name;
    private String email;

    public UserLoginResponse() {
    }

    public UserLoginResponse(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}

package com.hemreozdes.book_management.services;

import com.hemreozdes.book_management.entities.User;

public interface UserService {
    User findOrCreateUser(String email, String name);
}

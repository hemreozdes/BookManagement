package com.hemreozdes.book_management.services;

import com.hemreozdes.book_management.entities.User;
import com.hemreozdes.book_management.repos.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findOrCreateUser(String email, String name) {
        return userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User(name, email, new ArrayList<>());
                    return userRepository.save(newUser);
                });
    }
}

package com.hemreozdes.book_management.security;

import com.hemreozdes.book_management.services.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

    private final UserService userService;

    public SecurityUtils(UserService userService) {
        this.userService = userService;
    }

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();


        String auth0Id = jwt.getSubject();
        String email = jwt.getClaimAsString("https://book-management-api/email");
        String name = jwt.getClaimAsString("https://book-management-api/name");

        if (email == null) email = auth0Id;
        if (name == null) name = auth0Id;

        return userService.findOrCreateUser(email, name).getId();
    }
}

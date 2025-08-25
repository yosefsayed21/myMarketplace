package com.myprojects.marketplace.controller;

import com.myprojects.marketplace.dto.UserDTO;
import com.myprojects.marketplace.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public UserDTO create(@RequestBody UserDTO dto) { return userService.createUser(dto); }

    @GetMapping("/{id}")
    public UserDTO get(@PathVariable Long id) { return userService.getUserById(id); }

    @GetMapping
    public List<UserDTO> getAll() { return userService.getAllUsers(); }

    @GetMapping("/email/{email}")
    public UserDTO getByEmail(@PathVariable String email) { return userService.getUserByEmail(email); }

    @PutMapping("/{id}")
    public UserDTO update(@PathVariable Long id, @RequestBody UserDTO dto) { return userService.updateUser(id, dto); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { userService.deleteUser(id); }
}

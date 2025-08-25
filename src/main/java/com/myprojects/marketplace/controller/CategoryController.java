package com.myprojects.marketplace.controller;

import com.myprojects.marketplace.dto.CategoryDTO;
import com.myprojects.marketplace.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public CategoryDTO create(@RequestBody CategoryDTO dto) { return categoryService.createCategory(dto); }

    @GetMapping("/{id}")
    public CategoryDTO get(@PathVariable Long id) { return categoryService.getCategoryById(id); }

    @GetMapping
    public List<CategoryDTO> getAll() { return categoryService.getAllCategories(); }

    @PutMapping("/{id}")
    public CategoryDTO update(@PathVariable Long id, @RequestBody CategoryDTO dto) { return categoryService.updateCategory(id, dto); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { categoryService.deleteCategory(id); }
}

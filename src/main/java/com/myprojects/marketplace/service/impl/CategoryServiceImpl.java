package com.myprojects.marketplace.service.impl;

import com.myprojects.marketplace.dto.CategoryDTO;
import com.myprojects.marketplace.entity.Category;
import com.myprojects.marketplace.repository.CategoryRepository;
import com.myprojects.marketplace.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    private CategoryDTO toDto(Category c) { return new CategoryDTO(c.getId(), c.getName()); }
    private Category toEntity(CategoryDTO dto) { return Category.builder().name(dto.getName()).build(); }

    @Override
    public CategoryDTO createCategory(CategoryDTO dto) { return toDto(categoryRepository.save(toEntity(dto))); }

    @Override
    public CategoryDTO getCategoryById(Long id) { return categoryRepository.findById(id).map(this::toDto).orElse(null); }

    @Override
    public List<CategoryDTO> getAllCategories() { return categoryRepository.findAll().stream().map(this::toDto).collect(Collectors.toList()); }

    @Override
    public CategoryDTO updateCategory(Long id, CategoryDTO dto) {
        return categoryRepository.findById(id).map(c -> {
            c.setName(dto.getName());
            return toDto(categoryRepository.save(c));
        }).orElse(null);
    }

    @Override
    public void deleteCategory(Long id) { categoryRepository.deleteById(id); }
}

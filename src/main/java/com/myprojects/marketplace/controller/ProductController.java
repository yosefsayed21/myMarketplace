package com.myprojects.marketplace.controller;

import com.myprojects.marketplace.dto.ProductDTO;
import com.myprojects.marketplace.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ProductDTO create(@RequestBody ProductDTO dto) { return productService.createProduct(dto); }

    @GetMapping("/{id}")
    public ProductDTO get(@PathVariable Long id) { return productService.getProductById(id); }

    @GetMapping
    public List<ProductDTO> getAll() { return productService.getAllProducts(); }

    @GetMapping("/category/{categoryId}")
    public List<ProductDTO> byCategory(@PathVariable Long categoryId) { return productService.getProductsByCategory(categoryId); }

    @PutMapping("/{id}")
    public ProductDTO update(@PathVariable Long id, @RequestBody ProductDTO dto) { return productService.updateProduct(id, dto); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { productService.deleteProduct(id); }
}

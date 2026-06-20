package com.example.trendyvibe.service;

import com.example.trendyvibe.model.Product;
import com.example.trendyvibe.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // All products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Category-ல filter
    public List<Product> getByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    // Admin — add product
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // Admin — edit product
    public Product updateProduct(Long id, Product updated) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found!"));
        existing.setName(updated.getName());
        existing.setCategory(updated.getCategory());
        existing.setCloth(updated.getCloth());
        existing.setPrice(updated.getPrice());
        existing.setDiscount(updated.getDiscount());
        existing.setImage(updated.getImage());
        return productRepository.save(existing);
    }

    // Admin — delete product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
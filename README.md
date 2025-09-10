# 🛒 E-Commerce System  

This is my **first full-stack project**, where I built a complete e-commerce system with a secure backend and an interactive frontend.  

## 🚀 Tech Stack  

**Backend:**  
- Java  
- Spring Boot  
- Spring Data JPA  
- Hibernate  
- Spring Security  

**Frontend:**  
- React (with JavaScript)  

**Database:**  
- MySQL  

**Other Tools:**  
- Swagger (API Documentation)  
- DTOs (Data Transfer Objects for clean request/response handling)  

---

## 📌 Features  

- **Authentication & Authorization**  
  - User registration and login (secured with Spring Security)  

- **User Management**  
  - Create, update, delete users  
  - Get user by ID or email  

- **Product & Category Management**  
  - Add, update, delete products  
  - Assign products to categories  
  - Retrieve products by category  

- **Shopping Cart**  
  - Add items to cart  
  - Update or remove items  
  - Get cart by user  

- **Order Management**  
  - Create orders from cart  
  - Track orders by ID or user  

---

## 📖 API Documentation  

All APIs are documented and tested using **Swagger UI**.  
Here’s an overview of the available endpoints:  

### User Controller  
- `GET /api/users/{id}`  
- `POST /api/users`  
- `PUT /api/users/{id}`  
- `DELETE /api/users/{id}`  
- `GET /api/users`  
- `GET /api/users/email/{email}`  

### Product Controller  
- `GET /api/products/{id}`  
- `POST /api/products`  
- `PUT /api/products/{id}`  
- `DELETE /api/products/{id}`  
- `GET /api/products`  
- `GET /api/products/category/{categoryId}`  

### Category Controller  
- `GET /api/categories/{id}`  
- `POST /api/categories`  
- `PUT /api/categories/{id}`  
- `DELETE /api/categories/{id}`  
- `GET /api/categories`  

### Cart Controller  
- `GET /api/carts/{id}`  
- `POST /api/carts`  
- `PUT /api/carts/{id}`  
- `DELETE /api/carts/{id}`  
- `GET /api/carts/user/{userId}`  

### Order Controller  
- `GET /api/orders/{id}`  
- `POST /api/orders`  
- `PUT /api/orders/{id}`  
- `DELETE /api/orders/{id}`  
- `GET /api/orders`  
- `GET /api/orders/user/{userId}`  

### Auth Controller  
- `POST /api/auth/register`  
- `POST /api/auth/login`  

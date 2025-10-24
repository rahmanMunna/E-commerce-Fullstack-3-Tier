# A full-stack E-commerce Web Application built using React for the frontend and ASP.NET Web API for the backend.
The project follows 3-tier architecture, adheres to SOLID principles, and implements custom token-based authentication with role-based authorization.It also includes AutoMapper, Middleware, and Axios Interceptors for cleaner, more secure, and maintainable code.

## Technologies Used
### Frontend
- React.js
- Tailwind CSS
- Axios (for API calls)
- React Router DOM (for route protection)

### Backend
- ASP.NET Web API
- Entity Framework (ORM)
- MSSQL Server (DB)
- Repository Pattern
- SOLID Principles
- DTO Pattern for secure data transfer
- AutoMapper for object mapping between DTOs and entities
- Custom Middleware for error handling, logging, and request validation
- Custom Token-Based Authentication & Role-Based Authorization

## Design Principles
- SOLID principles for clean and scalable code
- 3-tier architecture for separation of concerns
- DTO pattern for safe data transfer
- Middleware for centralized request handling
- Axios Interceptor to handle tokens and API errors automatically
- DRY and Clean Code practices

## Core Features
### 👤 User Roles
***There are three user roles in the system: ***
- Customer
- Admin
- Deliveryman

### Customer Features
- log in 
- Browse products and Search Product
- Add items to cart and place orders
- View personal profile 
- View and track order history
- Token and role-based protected routes

### Admin Features
- View and manage inventory (Add, update, and delete products)
- Confirm or cancel placed orders
- Assign orders to deliverymen
- Track all active and completed orders
- Generate detailed financial reports

### Admin Dashboard Analytics
- View last 7 days sales data
- Track top 3 most selling products
- Identify low stock products
- Monitor today’s total sales, refunds, and completed orders
- View recent 3 orders in real time

### Deliveryman Features
- View and accept assigned orders
- Update status of delivered orders
- Track all delivered orders
- View today’s total completed orders

## Project UI:
<p align="center">
  <img src="../../SS/Login.png" width="700" alt="Homepage UI">
</p>


## Project Link
🔗 GitHub Repository: E-commerce-Fullstack

## Author
**Md. Habibur Rahman Munna**

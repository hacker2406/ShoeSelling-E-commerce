# Show-E-Commerce

A modern e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User registration & login (JWT authentication)
- Product browsing and detail pages
- Add to cart, update cart, and checkout
- Order placement and order history
- Admin dashboard for product and order management
- interactive admin lead dashboard to be added in process
- payment method to be added in process

## Tech Stack

- **Frontend:** React, Axios, React Router, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Authentication:** JWT (JSON Web Token)
- **Image Upload:** Cloudinary

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Show-E-Commerce.git
   cd Show-E-Commerce
   ```

2. **Install dependencies:**
   - For backend:
     ```bash
     cd backend
     npm install
     ```
   - For frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Environment Variables:**
   - Create a `.env` file in the backend directory with your MongoDB URI, JWT secret, and Cloudinary keys.

4. **Run the app:**
   - Start backend:
     ```bash
     npm run dev
     ```
   - Start frontend:
     ```bash
     npm start
     ```

5. **Visit:**  
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

```
/backend   # Express API, models, controllers, routes
/frontend  # React app, pages, components, context
```

## License

This project is for educational/demo purposes.

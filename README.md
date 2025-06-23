# Show-E-Commerce

A modern e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js).

---

## Features

- User registration & login (JWT authentication)
- Product browsing and detail pages
- Add to cart, update cart, and checkout
- Order placement and order history
- **Admin dashboard** for product, order, and user management
- Interactive admin lead dashboard (in progress)
- Payment integration (coming soon)

---

## Tech Stack

- **Frontend:** React, Axios, React Router, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Authentication:** JWT (JSON Web Token)
- **Image Upload:** Cloudinary

---

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

---

## Folder Structure

```
/backend   # Express API, models, controllers, routes
/frontend  # React app, pages, components, context
```

---

## Admin Info (for Recruiters)

- **Admin Dashboard:**  
  After registering the first user, that user is automatically set as admin.
- **Admin Login:**  
  Use the credentials of the first registered user to log in as admin.
- **Admin Features:**  
  - Manage products, orders, and users
  - Approve orders
  - View dashboard analytics and leads
  - Register additional admins (from the admin panel)
- **Demo Admin Credentials (if deployed):**  
  ```
  Email: ratul.9paul@gmail.com
  Password: Broexample
  ```
  *(Or register a new user to become admin if running locally for the first time)*

---

## Roadmap

- [x] Core e-commerce features
- [x] Admin dashboard & management
- [ ] Interactive analytics dashboard (in progress)
- [ ] Payment gateway integration (coming soon)
- [ ] Product reviews, wishlist, and more

---

## MongoDB Atlas Usage

This project uses **MongoDB Atlas** as its cloud database solution. Atlas provides a secure, scalable, and highly available MongoDB cluster that is easy to set up and manage.

### Why Atlas?
- **Cloud Hosted:** No need to install MongoDB locally.
- **Free Tier:** Great for development and demos.
- **Easy Scaling:** Upgrade your cluster as your app grows.
- **Global Access:** Access your database from anywhere.

### How to Use Atlas in This Project

1. **Create a MongoDB Atlas Account:**  
   Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and sign up.

2. **Create a Cluster:**  
   Follow the Atlas UI to create a free cluster.

3. **Get Your Connection String:**  
   - In your Atlas dashboard, click “Connect” > “Connect your application”.
   - Copy the provided MongoDB URI.

4. **Configure Your Environment:**  
   - In the `/backend/.env` file, set:
     ```
     MONGO_URI=your-mongodb-atlas-uri
     ```
   - Replace `your-mongodb-atlas-uri` with the string you copied.

5. **Network Access:**  
   - In Atlas, add your IP address (or `0.0.0.0/0` for development) to the Network Access whitelist.

6. **Database User:**  
   - Make sure you create a database user in Atlas and use their username/password in your URI.

### Example .env Entry

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### Notes

- All data for products, users, orders, etc., is stored securely in Atlas.
- You can view and manage your collections directly from the Atlas dashboard.

---

**Atlas makes it easy to deploy and scale your MERN stack application in the cloud!**

## License

This project is for educational/demo purposes only.This code is the sole property of mine

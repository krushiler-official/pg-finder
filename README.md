# 🏢 PG Finder - A Premium PG Booking Platform

PG Finder is a modern, enterprise-grade web application built to simplify the process of discovering, comparing, and booking Paying Guest (PG) accommodations. It provides a seamless, highly intuitive user experience coupled with a robust backend architecture.

## ✨ Key Features

### For Users
*   **Intelligent Search:** Quickly find PGs by searching specific locations or area names.
*   **Intuitive PG Comparison:** Add multiple PGs side-by-side to easily compare their prices, locations, and amenities.
*   **Real-time Booking System:** Easily book your stay with an integrated, intelligent calendar system directly from the PG detail page.
*   **My Bookings Dashboard:** A dedicated space for authenticated users to manage, view, and track their confirmed bookings.
*   **Dark / Light Mode:** A stunning, premium aesthetic offering customizable "Glassmorphism" light and dark themes.
*   **Wishlist:** Save your favorite PGs to view them later.
*   **Authentication:** Secure user registration and login handled by JWT and Bcrypt hashing.

### For Administrators (Upcoming/Internal)
*   **Admin Panel:** Access analytics, manage user accounts, and view overall system bookings.

---

## 🛠️ Technology Stack

### Frontend
*   **Framework:** [React.js](https://reactjs.org/) (Powered by [Vite](https://vitejs.dev/) for blazing-fast builds)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a utility-first, highly responsive design.
*   **Icons:** [Lucide React](https://lucide.dev/) for crisp, scalable vector graphics.
*   **Routing:** React Router DOM (v6).
*   **State Management:** React Context API for lightweight, efficient context layers (e.g., Theme, Auth, Compare List).
*   **Notifications:** React Hot Toast for sleek, non-intrusive popup alerts.

### Backend
*   **Server:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
*   **Database:** [MongoDB](https://www.mongodb.com/) (using [Mongoose](https://mongoosejs.com/) ODM)
*   **Security:** `bcryptjs` for secure password hashing.
*   **Architecture:** Clean MVC pattern (`Models`, `Controllers`, `Routes`).

---

## 🏗️ Project Structure

The project is structured into two completely independent architectural tiers:

```
8th-sem-pg-finder 2/
├── backend/                  # The Node.js Express server
│   ├── config/               # Database connection strings (db.js)
│   ├── controllers/          # Business logic (e.g., bookingController.js)
│   ├── models/               # MongoDB Schemas (User, PG, Booking)
│   ├── routes/               # API endpoint definitions
│   ├── server.js             # Application entry point
│   └── package.json          
│
└── frontend/                 # The React Vite application
    ├── src/
    │   ├── components/       # Reusable UI parts (Header, Footer, PGCard)
    │   ├── context/          # AppContext for global states (Auth, Theme)
    │   ├── pages/            # Full page views (Home, Compare, MyBookings)
    │   ├── index.css         # Global Tailwind directives
    │   └── App.jsx           # Main routing component
    ├── tailwind.config.js    # Standardized UI configurations
    └── package.json
```

---

## 🚀 Getting Started

Follow these steps to run the project securely on your local machine.

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16.0 or higher recommended)
*   [MongoDB](https://www.mongodb.com/try/download/community) Installed locally, or a MongoDB Atlas URI.

### 1. Backend Setup

1. Open your terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install the necessary Node modules:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/pg-finder  # Or your remote Atlas URI
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *The server should now be running on `http://localhost:5000`.*

### 2. Frontend Setup

1. Open a **new** terminal window and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The React app should now be running on `http://localhost:5173` (or the port specified by Vite).*

---

## 🤝 Contribution Guidelines

If you desire to extend this software:
1. Ensure all new components follow the existing *Tailwind Dark/Light* theme schema (using the `dark:` prefix).
2. Backend routes must be properly segmented into their respective `controller` and `route` files.
3. Use `react-hot-toast` for all frontend user notifications rather than native `alert()` functions.

---

> Crafted with precision for a modern accommodation discovery experience.

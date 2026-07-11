# 🍽️ Adrita Food Paradise — Full-Stack Web App

A restaurant / food-ordering web application built with **React (Vite + Tailwind)** on the
frontend and **Express + MongoDB (Mongoose)** on the backend.

Users can browse the menu, add items to a cart and wishlist, register / log in, place orders
(saved to the database), track their orders, and book table reservations.

---

## 🧱 Tech Stack

**Frontend:** React 18, React Router, Vite, Tailwind CSS, lucide-react
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs

---

## 📁 Project Structure

```
adrita-food-paradise/
├── src/                     # React frontend
│   ├── api/client.js        # API helper (talks to the backend)
│   ├── context/AppContext.jsx
│   ├── components/
│   ├── pages/
│   └── data/menuData.js
├── server/                  # Express + MongoDB backend
│   ├── config/db.js         # MongoDB connection
│   ├── models/              # User, MenuItem, Order, Reservation
│   ├── controllers/
│   ├── routes/
│   ├── middleware/          # auth (JWT) + error handling
│   ├── seed/seedMenu.js     # loads menu items into MongoDB
│   └── server.js            # entry point
├── .env                     # frontend env (VITE_API_URL)
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or newer
- **MongoDB** — either local (running on `mongodb://127.0.0.1:27017`) or a free
  [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

### 1) Backend

```bash
cd server
npm install

# Create your .env (a ready-made one is already included for local dev):
#   PORT=5000
#   MONGO_URI=mongodb://127.0.0.1:27017/adrita_food_paradise
#   JWT_SECRET=<any long random string>
#   CLIENT_URL=http://localhost:5173

npm run seed     # loads the 23 menu items into MongoDB (run once)
npm run dev      # starts the API on http://localhost:5000
```

### 2) Frontend

```bash
# from the project root (adrita-food-paradise/)
npm install
npm run dev      # starts the app on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## 🔌 API Endpoints

| Method | Endpoint               | Auth | Description                 |
|--------|------------------------|------|-----------------------------|
| POST   | `/api/auth/register`   | –    | Create a new account        |
| POST   | `/api/auth/login`      | –    | Log in, returns a JWT       |
| GET    | `/api/auth/me`         | ✔    | Current user profile        |
| GET    | `/api/menu`            | –    | List all menu items         |
| GET    | `/api/menu/:id`        | –    | Single menu item            |
| POST   | `/api/orders`          | ✔    | Place an order              |
| GET    | `/api/orders`          | ✔    | List the user's orders      |
| GET    | `/api/orders/:id`      | ✔    | Single order                |
| POST   | `/api/reservations`    | –    | Book a table                |
| GET    | `/api/reservations`    | –    | List reservations           |

Protected routes require an `Authorization: Bearer <token>` header.

---

## 🔐 Notes
- Passwords are hashed with **bcrypt** before being stored.
- Authentication uses **JWT**; the token is kept in the browser's localStorage.
- Cart and wishlist are stored client-side; **orders and reservations are saved in MongoDB.**
- The menu page loads from the database and falls back to bundled data if the API is offline.

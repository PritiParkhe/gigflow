# GigFlow – Mini Freelance Marketplace

## 📌 Project Overview

GigFlow is a mini freelance marketplace platform where users can post jobs (Gigs) and freelancers can apply by submitting bids. The platform supports secure authentication, job management, bidding, and a safe hiring flow that ensures only one freelancer can be hired per gig.

This project was built as part of a **Full Stack Development Internship Assignment** to demonstrate backend logic design, database relationships, authentication, and state management.

---

## 🛠 Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Redux Toolkit / Context API

### Backend

* Node.js
* Express.js
* MongoDB with Mongoose
* JWT Authentication (HttpOnly Cookies)

### Bonus (Optional)

* MongoDB Transactions
* Socket.io (Real-time notifications)

---

## ✨ Core Features

### 1. User Authentication

* Secure user registration and login
* Password hashing using bcrypt
* JWT-based authentication stored in HttpOnly cookies
* Roles are fluid: any user can post gigs or bid on them

### 2. Gig Management

* Create new gigs (authenticated users)
* Browse all open gigs
* Search gigs by title
* Gig status management: `open` → `assigned`

### 3. Bidding System

* Freelancers can submit bids with a message and price
* Users cannot bid on their own gigs
* Gig owners can view all bids on their gigs

### 4. Hiring Logic (Critical Feature)

* Gig owner can hire **one** freelancer
* Selected bid is marked as `hired`
* All other bids for the same gig are automatically marked as `rejected`
* Gig status changes from `open` to `assigned`

---

## 🔐 Hiring Logic & Transactional Integrity

The hiring process is implemented using **MongoDB transactions** to ensure atomicity and prevent race conditions.

### Why Transactions?

If two users attempt to hire different freelancers for the same gig at the same time, transactions ensure:

* Only one hire operation succeeds
* The gig cannot be assigned twice
* Data consistency is maintained

### Transaction Flow:

1. Verify the gig is still `open`
2. Mark the selected bid as `hired`
3. Mark all other bids for the gig as `rejected`
4. Update the gig status to `assigned`
5. Commit transaction or rollback on failure

---

## 🌐 API Endpoints

### Authentication

* `POST /api/auth/register` – Register a new user
* `POST /api/auth/login` – Login and set HttpOnly cookie

### Gigs

* `GET /api/gigs?search=` – Fetch all open gigs
* `POST /api/gigs` – Create a new gig (authenticated)

### Bids

* `POST /api/bids` – Submit a bid on a gig
* `GET /api/bids/:gigId` – View bids for a gig (owner only)

### Hiring

* `PATCH /api/bids/:bidId/hire` – Hire a freelancer (atomic operation)

---

## 🔒 Security Considerations

* JWT stored in HttpOnly cookies to prevent XSS attacks
* Protected routes using authentication middleware
* Ownership checks for gig and bid access
* Input validation on all critical endpoints

---

## 🚀 Getting Started

### Prerequisites

* Node.js
* MongoDB

### Installation

```bash
# Clone the repository
git clone <repo-url>

# Backend setup
cd server
npm install
npm run dev

# Frontend setup
cd client
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the server directory using `.env.example` as reference.

---

## 🔗 Project Links

* **Frontend (Live):** [https://gigflow-frontend.example.com](https://gigflow-frontend.example.com)
* **Backend API (Live):** [https://gigflow-backend.example.com](https://gigflow-backend.example.com)
* **Demo Video (Loom):** [https://loom.com/share/example-demo-video](https://loom.com/share/example-demo-video)

---

## 🎥 Demo

A short Loom video demonstrating:

* User authentication
* Gig creation
* Bidding process
* Hiring flow and status updates

---

## 🌟 Bonus Features

* Transaction-safe hiring logic using MongoDB sessions
* Real-time notification to hired freelancer using Socket.io *(if implemented)*

---

## 🧠 Key Learnings

* Designing race-condition safe backend logic
* Managing complex MongoDB relationships
* Implementing secure authentication with JWT
* Building scalable full-stack applications

---

## 👤 Author

**PRITI PARKHE**

Feel free to reach out for any questions or feedback.

# Villain Academy
https://villain-academy.vercel.app/

## Description

Villain Academy is a full-stack MERN application where aspiring villains can create accounts, enroll in the academy, build villain classes, and manage evil assignments. The application features role-based authentication, protected routes, assignment tracking, and a powerful administrative control panel for the academy's ruler, the **Super Ultra Mega Supreme Villain Lord**.

Regular villains can manage their own classes and assignments, while the Supreme Villain Lord has authority to view, edit, and delete all users, classes, and assignments across the academy.

---

## Technologies Used

### Frontend

* React
* React Router
* Axios
* Vite
* CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Features

### Villain Features

* Register an account
* Login and logout
* Create classes
* Edit classes
* Delete classes
* Create assignments
* Advance villainy progress
* Heroic relapse progress tracking
* Delete assignments

### Supreme Villain Lord Features

* View all villains
* View all classes
* View all assignments
* Edit any villain
* Delete any villain
* Edit any class
* Delete any class
* Edit any assignment
* Delete any assignment
* Access the exclusive Throne Room dashboard

### Security Features

* JWT authentication
* Protected routes
* Admin-only routes
* User ownership validation
* Password hashing with bcrypt

---

## Local Installation

### Clone Repository

```bash
git clone https://github.com/RPG-TaRon/Villain-Academy.git
cd Villain-Academy
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=1313
```

Start the backend:

```bash
npm run dev
```

or

```bash
node server.js
```

---

### Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:1313/api
```

Start the frontend:

```bash
npm run dev
```

The application will run locally at:

```txt
Frontend:
http://localhost:5173

Backend:
http://localhost:1313
```

---

## API Endpoints

### Authentication Routes

#### Register User

```http
POST /api/users/register
```

Creates a new villain account.

#### Login User

```http
POST /api/users/login
```

Authenticates a villain and returns a JWT token.

---

### Class Routes

#### Get Classes

```http
GET /api/classes
```

Returns all classes belonging to the authenticated villain.

#### Create Class

```http
POST /api/classes
```

Creates a new class.

#### Update Class

```http
PUT /api/classes/:classId
```

Updates an existing class.

#### Delete Class

```http
DELETE /api/classes/:classId
```

Deletes a class and its related assignments.

---

### Assignment Routes

#### Get Assignments

```http
GET /api/assignments/:classId
```

Returns assignments for a specific class.

#### Create Assignment

```http
POST /api/assignments/:classId
```

Creates a new assignment for a class.

#### Update Assignment

```http
PUT /api/assignments/:assignmentId
```

Updates assignment information.

#### Delete Assignment

```http
DELETE /api/assignments/:assignmentId
```

Deletes an assignment.

---

### Admin Routes

#### Academy Overview

```http
GET /api/admin/academy
```

Returns all villains, classes, assignments, and academy statistics.

#### Update Villain

```http
PUT /api/admin/users/:userId
```

Updates a villain account.

#### Delete Villain

```http
DELETE /api/admin/users/:userId
```

Deletes a villain account and all related data.

#### Update Class

```http
PUT /api/admin/classes/:classId
```

Updates any class.

#### Delete Class

```http
DELETE /api/admin/classes/:classId
```

Deletes any class.

#### Update Assignment

```http
PUT /api/admin/assignments/:assignmentId
```

Updates any assignment.

#### Delete Assignment

```http
DELETE /api/admin/assignments/:assignmentId
```

Deletes any assignment.

---

## Future Improvements

* Villain ranking system
* Academy leaderboards
* Achievement badges
* Activity logs
* Villain profile pages
* Notifications system
* Expanded academy statistics dashboard

---

## Author

Created by Ta'Ron Bentley

*"Every great villain starts somewhere. Villain Academy simply provides the curriculum."*

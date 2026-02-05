# YouTube Clone - MERN Stack

A YouTube clone built using MongoDB, Express, React, and Node.js.

## Features

- Home page with video grid, sidebar, search bar, and category filters
- User registration and login with JWT authentication
- Video player with like/dislike and comments
- Channel page to upload, edit, and delete videos
- Responsive design for mobile and desktop

## Tech Stack

**Frontend:** React, Vite, React Router, Axios  
**Backend:** Node.js, Express, MongoDB, JWT, bcrypt

## How to Run

### Backend

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

```bash
npm run seed    # Add sample data
npm run dev     # Start server
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Test Login

- Email: test@example.com
- Password: password123

## API Endpoints

**Auth:**
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

**Videos:**
- GET `/api/videos` - Get all videos
- GET `/api/videos/:id` - Get single video
- POST `/api/videos` - Create video
- PUT `/api/videos/:id` - Update video
- DELETE `/api/videos/:id` - Delete video
- POST `/api/videos/:id/like` - Like video
- POST `/api/videos/:id/dislike` - Dislike video

**Channels:**
- GET `/api/channels/:id` - Get channel
- POST `/api/channels` - Create channel

**Comments:**
- GET `/api/comments/:videoId` - Get comments
- POST `/api/comments` - Add comment
- PUT `/api/comments/:id` - Edit comment
- DELETE `/api/comments/:id` - Delete comment

## Author

Basant Saini

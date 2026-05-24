# Inkline Blog Project

Inkline is a full-stack MERN blog application where users can create accounts, verify email, publish posts, upload images, add comments, browse categories, and manage content through an admin dashboard.

## Live Demo

- Frontend: https://inkline-project.netlify.app/
- Backend API: https://inkline-project.onrender.com/

## Tech Stack

**Frontend**

- React
- React Router
- Redux Toolkit
- Axios
- CSS

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary
- Nodemailer

**Deployment**

- Netlify for the frontend
- Render for the backend
- MongoDB Atlas for the database

## Features

- User registration and login
- JWT-based authentication
- Email verification
- Forgot and reset password flow
- Create, update, and delete posts
- Upload post and profile images
- Comment system
- Category-based browsing
- User profile page
- Admin dashboard
- Manage users, posts, comments, and categories
- Responsive frontend UI

## Project Structure

```text
blog-project/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── utils/
│   └── app.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       └── utils/
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account
- Cloudinary account
- Email account or app password for Nodemailer

### Clone The Repository

```bash
git clone https://github.com/abdulrahmanaymandev/blog-project.git
cd blog-project
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=8000
NODE_ENV=development
MONGO_CLOUD_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
APP_EMAIL_ADDRESS=your_email_address
APP_EMAIL_PASSWORD=your_email_password
CLIENT_DOMAIN=http://localhost:3000
```

Run the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:8000
```

### Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
REACT_APP_API_URL=http://localhost:8000
```

Run the frontend:

```bash
npm start
```

The frontend will run on:

```text
http://localhost:3000
```

## Available Scripts

### Backend

```bash
npm run dev
npm start
npm run seed
npm run clear
```

### Frontend

```bash
npm start
npm run build
npm test
```

## Deployment Notes

### Backend On Render

Use these settings:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Required environment variables:

```env
NODE_ENV=production
MONGO_CLOUD_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
APP_EMAIL_ADDRESS=your_email_address
APP_EMAIL_PASSWORD=your_email_password
CLIENT_DOMAIN=https://inkline-project.netlify.app
```

### Frontend On Netlify

Use these settings:

```text
Base Directory: frontend
Build Command: npm run build
Publish Directory: frontend/build
```

Required environment variable:

```env
REACT_APP_API_URL=https://inkline-project.onrender.com
```

If Netlify uses `frontend` as the base directory automatically, set the publish directory to:

```text
build
```

## Author

Built by [Abdulrahman Ayman](https://github.com/abdulrahmanaymandev).

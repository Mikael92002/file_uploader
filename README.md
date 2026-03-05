# File Uploader

A full-stack file management application built with **React, Express, and PostgreSQL**, featuring user authentication, nested folder organization, and cloud-based file storage. This project demonstrates practical implementation of the **Prisma ORM** with a modern **TypeScript stack**.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Database Schema](#database-schema)
- [Development Notes](#development-notes)
- [Troubleshooting](#troubleshooting)
- [Performance Considerations](#performance-considerations)
- [Security Considerations](#security-considerations)

---

## Overview

File Uploader is a full-stack web application that allows users to securely upload, organize, and manage files in nested folder structures. Files are stored in **Cloudinary**, while metadata and user data are stored in **PostgreSQL** using **Prisma ORM**. The application uses **session-based authentication** and a **React frontend** powered by Vite.

---

## Features

- User authentication (signup, login, logout)
- Nested folder organization
- Cloud-based file uploads (Cloudinary)
- File metadata tracking
- Image preview and file details
- Folder navigation with breadcrumbs
- File and folder deletion
- Session-based authentication
- Type-safe database queries with Prisma

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- React Context API

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM

### Database
- PostgreSQL

### Storage
- Cloudinary (file hosting)

### Authentication
- Express sessions
- bcryptjs password hashing

---


---

## Prerequisites

- **Node.js** 18.0 or higher  
- **npm** 9.0 or higher (or yarn/pnpm)  
- **PostgreSQL** 12 or higher  
- **Cloudinary account**

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Mikael92002/file_uploader.git
cd file_uploader
```
### 2. Install Client Dependencies
```bash
cd server
npm install
cd ..
```

### 3. Install Server Dependencies
```bash
cd server
npm install
cd ..
```

## Configuration

### 1. Database Setup
```bash
 createdb file_uploader_db
 ```

 ### 2. Environment Variables
 ```bash
 # Database connection
DATABASE_URL="postgresql://user:password@localhost:5432/file_uploader_db"

# Server port
PORT=3000
NODE_ENV=development

# Cloudinary credentials
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Session secret
SESSION_SECRET=your_secure_random_string_here
```

### 3. Initialize the Database
```bash
cd server

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Optional: seed test data
npx prisma db seed

cd ..
```
### 4. Configure Cloudinary
```bash
server/src/middleware/cloudinaryConfig.ts
```

# File Uploader

## Running the Application

### Development Mode

Start the backend:

```bash
cd server
npm run dev
```

Backend runs at: `http://localhost:3000`

Start the frontend in a new terminal:

```bash
cd client
npm run dev
```

Frontend runs at: `http://localhost:5173`

Vite proxies API requests to the backend using the proxy configuration in `vite.config.ts`.

### Production Build

```bash
# Build frontend
cd client
npm run build

# Build backend
cd ../server
npm run build

# Start production server
npm start
```

---

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint  | Description       |
|--------|-----------|-------------------|
| POST   | /login    | User login        |
| POST   | /signup   | User registration |
| GET    | /signout  | User logout       |

### User Routes (`/api/user`)

| Method | Endpoint | Description                      |
|--------|----------|----------------------------------|
| GET    | /        | Get current user from session cookie |

### File Routes (`/api/file`)

| Method | Endpoint    | Description            |
|--------|-------------|------------------------|
| POST   | /upload     | Upload file            |
| DELETE | /:fileId    | Delete a file          |
| DELETE | /delete     | Delete multiple files  |

#### Upload Request

```
POST /api/file/upload
Content-Type: multipart/form-data
```

**Fields:**
- `file`: [binary file]
- `fileName`: `"document.png"`
- `folderId`: `1`

### Folder Routes (`/api/folder`)

| Method | Endpoint    | Description       |
|--------|-------------|-------------------|
| POST   | /           | Create folder     |
| GET    | /:userId    | Get all folders   |
| DELETE | /:folderId  | Delete folder     |

---

## Frontend Components

| Component | Description |
|-----------|-------------|
| `Home` | Main dashboard |
| `FileUploadForm` | Upload modal |
| `FileView` | File details page |
| `FolderCreateForm` | Create folders |
| `FileIterator` / `FolderIterator` | Render file and folder lists |
| `LogIn` / `SignUp` | Authentication pages |
| `Header` | Navigation bar |

### React Context Providers

| Context | Description |
|---------|-------------|
| `AuthContext` | User authentication state |
| `FolderContext` | Folder tree state |
| `LoadContext` | Global loading state |
| `AudioContext` | UI click sounds |

### Backend Controllers

| Controller | Description |
|------------|-------------|
| `authController` | Authentication logic |
| `userController` | Session user queries |
| `fileController` | File uploads and deletion |
| `folderController` | Folder CRUD operations |

---

## Database Schema

### User
```prisma
model User {
  id       Int      @id @default(autoincrement())
  username String   @unique @db.VarChar(20)
  password String
  folders  Folder[]
}
```

### Folder
```prisma
model Folder {
  id         Int      @id @default(autoincrement())
  folderName String   @db.VarChar(25)
  userId     Int
  files      File[]
  parentId   Int?
  parent     Folder?
  children   Folder[]
}
```

### File
```prisma
model File {
  id         Int      @id @default(autoincrement())
  fileName   String   @db.VarChar(25)
  fileURL    String
  size       Int
  uploadTime DateTime @db.Timestamptz()
  folderId   Int

  @@unique([fileName, folderId])
}
```

### Session
```prisma
model Session {
  id        String   @id
  sid       String   @unique
  data      String
  expiresAt DateTime
}
```

---

## Usage Guide

### Create an Account
1. Navigate to **Sign Up**
2. Enter a username (max 20 characters)
3. Enter a password
4. Click **Sign Up**

### Upload Files
1. Click **New File**
2. Enter filename (max 25 characters)
3. Select image file (JPEG, PNG, GIF)
4. Click **Upload**

### Organize with Folders
1. Click **New Folder**
2. Enter folder name
3. Navigate folders by clicking them
4. Use breadcrumb navigation to go back

### View File Details
Click a file thumbnail to view:
- File name
- File size
- Upload timestamp
- Image preview

### Delete Files or Folders
1. Click the trash icon
2. Confirm deletion

> Files are removed from Cloudinary and the database.

---

## Development Notes

### Adding API Routes
Edit `server/src/routes.ts`

### Adding Database Models
1. Edit `server/prisma/schema.prisma`
2. Then run:
```bash
npx prisma migrate dev
```

### Adding Frontend Pages
- Create new components in `client/src/components/`
- Add routes in `client/src/routes/routes.tsx`

### Code Style
- TypeScript strict mode
- ESLint with React rules
- Functional components with hooks
- Type-safe Prisma queries

### Error Handling
- Fetch functions return `null` on failure
- Express middleware returns JSON errors
- `try/catch` for async functions
- Custom application error classes

---

## Troubleshooting

### Database Connection Issues
```bash
psql -U postgres
```
Verify connection string in `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/file_uploader_db"
```

### Cloudinary Upload Fails
- Verify credentials
- Check file size (max 5MB)
- Confirm valid image format

### CORS or Proxy Issues
- Verify proxy config in `vite.config.ts`
- Ensure backend is running

### Session Issues
- Clear browser cookies
- Verify `SESSION_SECRET`
- Confirm session store configuration

---

## Performance Considerations
- Files served through Cloudinary CDN
- React Context prevents excessive prop drilling
- Memoized components reduce re-renders
- Prisma schema ensures proper indexing

## Security Considerations
- Passwords hashed using `bcryptjs` (10 rounds)
- `httpOnly` session cookies
- File type validation (MIME + extension)
- Prisma prevents SQL injection
- Unique constraint on `(fileName, folderId)` prevents duplicates
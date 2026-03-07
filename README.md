# File Uploader

A full-stack file management app built with React, Express, and PostgreSQL. It handles nested folders, secure user auth, and offloads storage to Cloudinary. This was built to practice using Prisma ORM within a modern TypeScript stack.

---

## Core Features

- **Auth** — Full signup/login flow using session-based authentication.
- **Organization** — Create nested folders with breadcrumb navigation.
- **Cloud Storage** — Files are streamed to Cloudinary, keeping the local database lean.
- **Type Safety** — End-to-end TypeScript with Prisma for database queries.
- **Management** — Preview image details, track metadata, and perform bulk deletions.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React (Vite), TypeScript, Context API |
| Backend | Node.js, Express, Prisma ORM |
| Database | PostgreSQL |
| Storage | Cloudinary API |

---

## Getting Started

### 1. Installation

Clone the repo and install dependencies for both the client and server:

```bash
git clone https://github.com/Mikael92002/file_uploader.git
cd file_uploader

cd client && npm install
cd ../server && npm install
```

### 2. Environment Setup

Create a `.env` file in the `server` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/file_uploader_db"
PORT=3000
SESSION_SECRET="your_secret_here"

# Cloudinary
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### 3. Database Initialization

Run the following inside the `server` folder to sync your schema:

```bash
npx prisma generate
npx prisma migrate dev
```

---

## Running the App

You'll need two terminals open.

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

The frontend will be at `http://localhost:5173` and automatically proxies API requests to the backend.

---

## Database Schema

The data model focuses on the relationship between users, their folders, and the files within them.

- **User** — Owns multiple folders.
- **Folder** — Supports a self-referencing relationship (parent/children) for nesting.
- **File** — Linked to a folder and stores the Cloudinary URL and metadata.

---

## Security Notes

- **Passwords** — Hashed using `bcryptjs`.
- **Sessions** — Uses `httpOnly` cookies to mitigate XSS risks.
- **Uploads** — Validates MIME types and file extensions before sending to the cloud.
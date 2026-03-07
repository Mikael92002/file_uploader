# File Uploader

An advanced file management system featuring nested directories, cloud storage, and relational database integration. Built with TypeScript, this project demonstrates recursive data handling and state management in the frontend. The backend handles authentication, cloud storage API interactions, and database operations through prisma.

---

## Highlights

- **Recursive Folder Architecture**: A self-referencing Prisma schema to support infinite folder nesting and featuring `onDelete: Cascade` to ensure recursive deletes.
- **Authentication**: A session-based authentication flow using Passport.js and express-session, with persistent storage in PostgreSQL via Prisma.
- **Cloud-Based File Handling**: Integrated Cloudinary API for image uploads, reducing server-side processing.
- **Type-Safety**: Utilized Typescript with custom interfaces to ensure type safety from the database to the UI.
- **Relational Logic**: Users, Files, and Folder modeled with relational schemas.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite, React Context API |
| Backend | Node.js, Express, TypeScript, Passport.js |
| Database | PostgreSQL, Prisma ORM |
| Storage | Cloudinary API |

---

## System Architecture

The application is split into a monorepo for clear separation of concerns.

- **Server**: A RESTful API focused on controller functions and middleware validation.
- **Client**: A component-based SPA utilizing breadcrumb navigation and recursive rendering for folder trees.

---

## Database Schema

```prisma
model Folder {
  id         Int      @id @default(autoincrement())
  folderName String   @db.VarChar(25)
  userId     Int
  parentId   Int?     // Recursive parent reference
  parent     Folder?  @relation("SubFolders", fields: [parentId], references: [id], onDelete: Cascade)
  children   Folder[] @relation("SubFolders")
  files      File[]
}

model File {
  id         Int      @id @default(autoincrement())
  fileName   String   @db.VarChar(25)
  fileURL    String
  size       Int
  folderId   Int

  @@unique([fileName, folderId]) // Prevents duplicate names in the same directory
}
```

---

## Local Development

### Prerequisites

- Node.js v18+
- PostgreSQL instance
- Cloudinary API keys

### Setup

**1. Clone & Install:**
```bash
git clone https://github.com/Mikael92002/file_uploader.git

cd client && npm install
cd ../server && npm install
```

**2. Environment Setup:**

Create a `.env` in `/server` with your `DATABASE_URL`, `SESSION_SECRET`, and Cloudinary credentials.

**3. Initialize Database:**
```bash
npx prisma generate
npx prisma migrate deploy
```

**4. Run:**
```bash
# Terminal 1 — Server
cd server && npm run dev

# Terminal 2 — Client
cd client && npm run dev
```
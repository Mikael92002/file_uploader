# File Uploader

A high-performance file management system featuring nested directory structures, secure cloud storage, and relational data integrity. Built with a modern TypeScript stack, this project demonstrates a deep dive into recursive data handling and scalable backend architecture.

---

## Highlights

- **Recursive Folder Architecture**: Implemented a self-referencing PostgreSQL schema to support infinite folder nesting with `onDelete: Cascade` referential integrity.
- **Secure Authentication**: Engineered a session-based auth flow using Passport.js and express-session, with persistent storage in PostgreSQL via Prisma.
- **Optimized File Handling**: Integrated Cloudinary API for image uploads, reducing server-side processing overhead.
- **Type-Safe Database Layer**: Utilized Prisma ORM with custom TypeScript interfaces to ensure type safety from the database to the UI.
- **Relational Logic**: Leveraged composite unique constraints `@@unique([fileName, folderId])` to maintain data integrity across shared directories.

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

The application is split into a decoupled monorepo for independent scaling.

- **Server**: A RESTful API focused on controller-service patterns and middleware validation.
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
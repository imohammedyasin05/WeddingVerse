# WeddingVerse - Full Stack Wedding Services Platform

WeddingVerse is a comprehensive, modern, full-stack marketplace connecting couples with elite wedding vendors.

## Tech Stack
* **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Lucide React
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (via Prisma ORM) - Currently using Supabase

## Live Demo
- **Frontend:** https://wedding-verse-49sp.vercel.app
- **Backend API:** https://weddingverse-api.onrender.com

## Project Structure
* `/client` - The React frontend application. Contains the complete cinematic luxury landing page.
* `/server` - The Node/Express backend REST API and Prisma database schemas.
* `/database` - Raw SQL schema and seed data for the PostgreSQL database.
* `PRD.md`, `DESIGN.md`, `TECH_STACK.md` - Comprehensive documentation covering requirements, design system, and technical architecture.

---

## Local Development Setup

### Prerequisites
* Node.js (v18+)
* PostgreSQL running locally or remotely

### 1. Database Setup
1. Open your PostgreSQL client.
2. Create a new database named `weddingverse`.
3. Run the SQL scripts found in `/database`:
   ```bash
   psql -U postgres -d weddingverse -f database/schema.sql
   psql -U postgres -d weddingverse -f database/seed.sql
   ```
   *(Alternatively, you can skip this step and use `npx prisma db push` and write a seed script, but the raw SQL is provided for direct testing).*

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your actual Postgres credentials and a generated JWT Secret.
5. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```
6. Start the development server (runs on port 5000):
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser to view the cinematic landing page.

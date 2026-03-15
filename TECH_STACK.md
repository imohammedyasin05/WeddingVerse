# WeddingVerse — Tech Stack Document

## Objective

This document details the technical architecture, technology choices, and development strategies for building WeddingVerse, a full-stack wedding services platform. The system is designed to be highly scalable, maintainable, and production-ready.

---

## 1. Frontend Architecture

The frontend is a single-page application (SPA) built for high performance and excellent developer experience.

- **Core Library:** React.js (via Vite for fast bundling)
- **Routing:** TanStack Router (Provides type-safe file-based routing and granular data loading)
- **UI & Styling:** Tailwind CSS (Utility-first CSS for rapid, consistent styling)
- **Icons & Components:** Lucide React (icons), Headless UI or Radix UI (accessible unstyled components if needed)

**Component Strategy:**
- Presentational Components (`src/components/ui/`): Dumb, reusable UI building blocks (Buttons, Inputs, Cards).
- Feature Components (`src/components/features/`): Domain-specific components connected to state (VendorGrid, InquiryForm).
- Layout Components (`src/components/layouts/`): Page wrappers (MainLayout, DashboardLayout).

---

## 2. Backend Architecture

The backend is a monolithic REST API, structured into modular layers for separation of concerns.

- **Runtime:** Node.js
- **Framework:** Express.js (Minimal, flexible web application framework)
- **Architecture Pattern:** Controller-Service-Repository (or just Controller-Model if using Prisma directly). We will primarily use a robust Controller-Route separation.
  - **Routes:** Define API endpoints and apply middleware.
  - **Controllers:** Handle HTTP req/res, extract payloads, pass to Prisma, and format responses.

**Key Libraries:**
- `cors`, `helmet`, `morgan` for middleware.
- `dotenv` for environment configuration.

---

## 3. Database Schema & ORM

- **Database Engine:** PostgreSQL (Relational, robust, ACID compliant).
- **ORM:** Prisma ORM (Type-safe database client and schema migrations).

### Core Entities:
1. **users:** UUID, name, email, password_hash, role (Enum: couple, planner, vendor).
2. **vendors:** Profile for vendors (business_name, bio, location, category). 1:1 with `users`.
3. **services:** Packages/services offered by vendors.
4. **inquiries:** Requests sent by users to vendors (dates, message, status).
5. **reviews:** (Optional future use) User feedback for vendors.

---

## 4. API Structure

RESTful design principles will be followed. All routes prefixed with `/api/v1`.

| Resource | Method | Endpoint | Description | Auth Required |
|---|---|---|---|---|
| **Auth** | POST | `/api/v1/auth/signup` | Register user | No |
| | POST | `/api/v1/auth/login` | Authenticate & issue JWT | No |
| | GET | `/api/v1/auth/me` | Get current user | Yes |
| **Vendors** | GET | `/api/v1/vendors` | List vendors (filters applied) | No |
| | GET | `/api/v1/vendors/:id` | Get vendor details | No |
| | PUT | `/api/v1/vendors/:id` | Update vendor profile | Yes (Vendor) |
| **Inquiries** | POST | `/api/v1/inquiries` | Create new inquiry | Yes (User) |
| | GET | `/api/v1/inquiries` | List inquiries (user/vendor context) | Yes |
| | PATCH | `/api/v1/inquiries/:id/status`| Update status (e.g., responded) | Yes (Vendor) |

---

## 5. Authentication System

- **Strategy:** JSON Web Tokens (JWT) via the `jsonwebtoken` library.
- **Passwords:** Hashed using `bcryptjs` before storage.
- **Flow:**
  1. Client sends email/password to `/login`.
  2. Server verifies and signs a JWT (usually containing `{ userId, role }`).
  3. Server returns JWT in response payload (or HTTP-only cookie).
  4. Client stores JWT (e.g., in `localStorage` or memory state) and attaches it to the `Authorization: Bearer <token>` header for protected routes.
- **Middleware:** `authMiddleware` verifies the token and attaches `req.user`.

---

## 6. State Management & Data Fetching

- **Server State / Data Fetching:** TanStack Query (React Query)
  - Handles caching, background updates, loading/error states for API requests.
- **Client State (Global):** React Context API (e.g., `AuthContext` to store user session globally).
- **HTTP Client:** Axios
  - Centralized setup (`src/api/axios.js`) to attach interceptors (adding Bearer token automatically, handling 401s).

---

## 7. Form Handling & Validation

- **Form Management:** React Hook Form
  - Performant, uncontrolled form inputs minimizing re-renders.
- **Validation (Client & Server):** Zod
  - Schema declaration and validation library.
  - Used with `@hookform/resolvers/zod` on the frontend.
  - Same Zod schemas can theoretically be shared, but mostly used to validate `req.body` on the Express backend before hitting the DB.

---

## 8. Folder Structure

```
WeddingVerse/
├── client/                     # React Frontend
│   ├── .env                    # Vite env variables
│   ├── index.html
│   ├── postcss.config.js
│   ├── tailwind.config.js      # Tailwind design system
│   ├── vite.config.js
│   ├── src/
│   │   ├── api/                # Axios instance & API wrapper calls
│   │   ├── assets/             # Static images, icons
│   │   ├── components/         # UI basics, features, layouts
│   │   ├── context/            # Global React Contexts (Auth)
│   │   ├── hooks/              # Custom React hooks (TanStack Query hooks)
│   │   ├── routes/             # TanStack Router file-based route definitions
│   │   ├── utils/              # Helper functions (formatting, validation tools)
│   │   └── main.jsx            # App entry
│   
├── server/                     # Node/Express Backend
│   ├── .env                    # Database URL, JWT Secret
│   ├── package.json
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema definition
│   │   └── seed.js             # Initial database seeding
│   ├── src/
│   │   ├── controllers/        # Route handler functions
│   │   ├── middleware/         # Auth, Error, Validation middlewares
│   │   ├── routes/             # Express router definitions
│   │   ├── config/             # Environment, DB connections
│   │   ├── utils/              # JWT singing, error handlers
│   │   └── index.js            # Server entry point
│
└── database/                   # Raw SQL exports (if separated from Prisma)
    ├── schema.sql
    └── seed.sql
```

---

## 9. Deployment Strategy

- **Frontend (Client):** **Vercel**
  - Seamless integration with Vite/React. Global CDN, automatic PR previews.
- **Backend (Server):** **Render**
  - Web service for Node.js API. Connects directly to GitHub repo, auto-deploys on main branch push. Requires configuring env vars (DATABASE_URL, JWT_SECRET).
- **Database:** **Supabase (or Neon)**
  - Managed Serverless PostgreSQL database. Connection string `DATABASE_URL` is provided to the Render backend and local Prisma `.env`.

---

## 10. Security Best Practices

1. **Helmet.js:** Use in Express to set secure HTTP headers.
2. **CORS:** Restrict Cross-Origin Resource Sharing on the backend to only allow the Vercel frontend domain.
3. **Password Hashing:** Always use `bcrypt` with salt rounds (e.g., 10).
4. **Input Validation:** Use Zod middleware on all POST/PUT routes to prevent SQL injection or bad data entering Prisma.
5. **Rate Limiting:** Implement `express-rate-limit`, specially on auth routes (`/login`, `/signup`) to prevent brute force.
6. **Environment Variables:** Never commit `.env` files. Keep Secrets (JWT Secret, DB URLs) out of client-side code unless explicitly prefixed with `VITE_`.
7. **Error Responses:** Do not leak stack traces or raw database errors to the client in production; return generic 500 or specific 400 validation error messages.

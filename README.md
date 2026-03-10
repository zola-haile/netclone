# NetClone

A full-stack Netflix-inspired streaming platform built from scratch. Browse movies and TV shows, manage a personal account, and track your watch history — all behind a complete authentication system with email verification.

---

## Features

- **Authentication** — Signup, login, and email verification with 24-hour token expiry
- **Content Browsing** — Home page with trending content, dedicated Movies and Shows pages
- **Movie Cards** — Rich metadata display: poster, rating, genres, description, runtime, cast
- **Video Player** — Watch movies with progress tracking
- **Watch History** — Per-user history with last position and completion tracking
- **User Account Page** — Profile info, favorite genres, security settings, and personalization
- **Theming** — Dynamic accent color/background theming persisted to localStorage
- **Protected Routes** — JWT-based auth guard on all private pages

---

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 19, Vite 7, React Router DOM 7            |
| Backend    | Node.js 20, Express 5                           |
| Database   | PostgreSQL (via `pg` driver)                    |
| Auth       | JWT (`jsonwebtoken`), bcrypt                    |
| Email      | Nodemailer (Gmail SMTP)                         |
| Deployment | Docker (backend)                                |

---

## Project Structure

```
netClone/
├── frontend/
│   └── src/
│       ├── AuthContext/        # JWT auth state (context + hooks)
│       ├── components/
│       │   ├── NavBar/
│       │   ├── MovieCard/
│       │   ├── MovieGroup/
│       │   ├── Trending/
│       │   └── Layout/         # MainLayout, ProtectedRoute
│       └── pages/
│           ├── Home/
│           ├── Movies/
│           ├── Shows/
│           ├── Watch/
│           ├── User/
│           └── Login/          # Login, Signup, Verification
│
└── backend/
    ├── routes/movies.js        # All API endpoints
    ├── controllers/
    │   ├── moviesController.js
    │   └── userController.js
    ├── db/
    │   ├── pool.js             # PostgreSQL connection
    │   └── queries.js          # All DB operations
    ├── services/
    │   └── email_services.js   # Nodemailer email sending
    └── server.js               # Express app entry point
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL

### 1. Database Setup

```bash
psql postgres
```
```sql
CREATE ROLE nikka WITH LOGIN PASSWORD 'sungodnikka';
ALTER ROLE nikka CREATEDB;
```
```bash
createdb netclone -O nikka
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
DB_USER=nikka
DB_PASSWORD=sungodnikka
DB_NAME=netclone
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

```bash
npm start
# Runs on http://localhost:3000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## API Reference

All endpoints are prefixed with `/movies`.

### Content

| Method | Endpoint                        | Description            |
|--------|---------------------------------|------------------------|
| GET    | `/getAllFilms`                  | All movies and shows   |
| GET    | `/getMovieByType?type=movie`   | Movies only            |
| GET    | `/getMovieByType?type=show`    | Shows only             |

### Authentication & Users

| Method | Endpoint                     | Body                              | Description                  |
|--------|------------------------------|-----------------------------------|------------------------------|
| POST   | `/user/signup`              | `{ firstname, lastname, email, password }` | Register new user  |
| POST   | `/user/login`               | `{ email, password }`            | Login, returns JWT token     |
| GET    | `/user/verify-email`        | `?token=<token>`                 | Verify email address         |
| POST   | `/user/resend_verification` | `{ email }`                      | Resend verification email    |
| POST   | `/user/getInfo`             | `{ email }`                      | Get user profile             |
| POST   | `/user/watch_history`       | `{ user_id }`                    | Get user's watch history     |

---

## Database Schema

### `users`
| Column               | Type        |
|----------------------|-------------|
| id                   | SERIAL PK   |
| firstname, lastname  | VARCHAR     |
| email                | VARCHAR UNIQUE |
| password             | VARCHAR (bcrypt hashed) |
| is_validated         | BOOLEAN     |
| profile_pictur_url   | VARCHAR     |
| favorite_genre       | TEXT[]      |
| email_verify_token   | VARCHAR     |
| email_verify_expires | TIMESTAMP   |

### `movies`
| Column           | Type      |
|------------------|-----------|
| id               | SERIAL PK |
| title            | VARCHAR UNIQUE |
| year, release_date | INT / DATE |
| genres           | TEXT[]    |
| description      | TEXT      |
| poster_url, trailer_url, file_url | VARCHAR |
| runtime_minutes  | INT       |
| movie_type       | VARCHAR (`movie` or `show`) |
| director, writers, main_cast | TEXT[] |
| rating, vote_count, popularity_score | NUMERIC / INT |
| watch_count, likes_count | INT   |

### `watch_history`
| Column        | Type      |
|---------------|-----------|
| id            | SERIAL PK |
| user_id       | FK → users |
| movie_id      | FK → movies |
| last_position | INT (seconds) |
| completed     | BOOLEAN   |
| watched_at    | TIMESTAMP |

---

## Docker (Backend)

```bash
cd backend
docker build -t netclone-backend .
docker run -p 3000:3000 --env-file .env netclone-backend
```

---

## Scripts

### Frontend
| Command           | Description              |
|-------------------|--------------------------|
| `npm run dev`     | Start dev server (HMR)   |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

### Backend
| Command     | Description       |
|-------------|-------------------|
| `npm start` | Start the server  |

---

## Roadmap

- [ ] Shows page full implementation
- [ ] Profile picture upload
- [ ] Favorite genres persistence
- [ ] Advanced search and filtering
- [ ] Movie ratings and reviews
- [ ] Content recommendations
- [ ] Mobile-responsive layout

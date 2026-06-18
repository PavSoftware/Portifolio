# PavSoftware Full-Stack Portfolio

A modern, high-performance portfolio platform built with React, Node.js, and PostgreSQL.

## Architecture
- **Monorepo**: Managed with NPM Workspaces.
- **Frontend**: React 18, Vite, Tailwind CSS v4, Framer Motion, Lucide React.
- **Backend**: Node.js, Express, Sequelize ORM, PostgreSQL.
- **Database**: PostgreSQL with Sequelize migrations/sync.
- **Auth**: JWT Authentication with protected routes.

## Project Structure
```
apps/
  web/          # React + Vite Frontend
  api/          # Node + Express API
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL

### Installation
1. Clone the repository
2. Install dependencies for all apps:
   ```bash
   npm install
   ```

### Configuration
1. Create a `.env` file in `apps/api/` and `apps/web/` based on the `.env.example` (to be created).

**API .env:**
```env
PORT=5000
DB_NAME=portfolio
DB_USER=postgres
DB_PASS=yourpassword
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
```

### Running Locally
To run both frontend and backend concurrently:
```bash
npm run dev
```

Or individually:
- Frontend: `npm run dev:web`
- Backend: `npm run dev:api`

## Features
- **Dynamic Portfolio**: Manage projects via Admin Dashboard.
- **Gallery**: Dynamic image grid.
- **Testimonials**: Customer feedback management.
- **Admin Panel**: Full CRUD for all resources.
- **Premium Design**: Dark mode fintech aesthetic with smooth animations.
- **Responsive**: Mobile-first approach.

- **Desenvolvido por**: [Pavlov Claymor](https://github.com/pavlovclaymor)

## License
MIT

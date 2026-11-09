# Dev Portfolio — Single Server (MERN)

React frontend and Express/MongoDB backend are now served from **one Express server** in production.

## Requirements
- Node.js 18+
- MongoDB connection string

## Install
From the `portfolio/` root:

```bash
npm install
```

## Configure environment
Create `server/.env` using `server/.env.example`, then set at least:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=use_a_long_random_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=use_a_strong_password
```

`CLIENT_URL` is only needed if you later separate the frontend onto another domain. The unified production setup is same-origin.

## Run locally
Build the frontend, then start the single server:

```bash
npm run build
npm start
```

Open `http://localhost:5000`. The admin login is at `http://localhost:5000/admin/login`.

To create the admin account and sample projects, run once:

```bash
npm run seed
```

For frontend hot reload during development, use two terminals:
- `npm run dev` — Express API on port 5000
- `npm run dev:client` — Vite frontend on port 5173 (Vite proxies `/api` to Express)

## Deployment
Deploy the `portfolio/` folder as one Node.js service:
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Set the environment variables listed above in the hosting dashboard.
- Make sure the host provides a persistent/reachable MongoDB service.

Express serves `client/dist` and handles `/api/*` on the same port/domain. No separate frontend hosting or CORS domain is required.

## API overview
| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/login` | Log in and set HTTP-only cookie |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/auth/me` | Current admin |
| GET | `/api/projects` | List published projects |
| GET | `/api/projects/:id` | Single project |
| GET | `/api/projects/stats` | Dashboard counts |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

Project images remain URL-based (for example, Cloudinary or another hosted image URL).
# my_portfolio

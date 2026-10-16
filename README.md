# Portfolio Backend

COMP229 Assignment 2. REST API for my portfolio, built with Node.js, Express and Mongoose, connected to MongoDB Atlas (database `portfolio`).

Live server (Vercel): https://portfolio-backend-sand-three.vercel.app

Example: https://portfolio-backend-sand-three.vercel.app/api/services

## Run locally

1. `npm install`
2. Copy `.env.example` to `.env` and put your MongoDB Atlas connection string in `MONGODB_URI`.
3. `npm start` (or `npm run dev` to restart on file changes)

The server runs on http://localhost:3000.

## Project structure

```
server.js              entry point: loads .env, connects to MongoDB, starts the server
config/express.js      Express app: morgan, cors, body parsing, routes, 404, error handler
config/db.js           MongoDB Atlas connection function
models/                Mongoose models (reference, project, service, user)
controllers/           CRUD logic for each model and the global error handler
routes/                Express routers for each model
```

## Endpoints

| Method | URL | Action |
|---|---|---|
| GET | /api/references | get all references |
| GET | /api/references/:id | get reference by id |
| POST | /api/references | add new reference |
| PUT | /api/references/:id | update reference by id |
| DELETE | /api/references/:id | remove reference by id |
| GET | /api/projects | get all projects |
| GET | /api/projects/:id | get project by id |
| POST | /api/projects | add new project |
| PUT | /api/projects/:id | update project by id |
| DELETE | /api/projects/:id | remove project by id |
| GET | /api/services | get all services |
| GET | /api/services/:id | get service by id |
| POST | /api/services | add new service |
| PUT | /api/services/:id | update service by id |
| DELETE | /api/services/:id | remove service by id |
| GET | /api/users | get all users |
| GET | /api/users/:id | get user by id |
| POST | /api/users | add new user |
| PUT | /api/users/:id | update user by id |
| DELETE | /api/users/:id | remove user by id |

## Response format

- add and get by id: `{ success, message, data }`, where `data` is the object with an `id` field.
- get all: `{ success, message, data }`, where `data` is a list of objects, each with an `id` field.
- update and delete: `{ success, message }`.
- errors: `{ success: false, message }` with the matching HTTP status (400, 404 or 500).

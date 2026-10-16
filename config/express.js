import express from "express";
import cors from "cors";
import morgan from "morgan";
import createError from "http-errors";
import connectDB from "./db.js";
import errorCtrl from "../controllers/error.controller.js";
import referenceRoutes from "../routes/reference.routes.js";
import projectRoutes from "../routes/project.routes.js";
import serviceRoutes from "../routes/service.routes.js";
import userRoutes from "../routes/user.routes.js";

const app = express();

// Log every request in the console (method, url, status, response time)
app.use(morgan("dev"));

// Allow requests from other origins, e.g. the React frontend
app.use(cors());

// Read JSON and form data from the request body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home page of the API: shows that the server is running and lists the endpoints
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Portfolio backend.",
    endpoints: {
      references: "/api/references",
      projects: "/api/projects",
      services: "/api/services",
      users: "/api/users",
    },
    methods: {
      "GET /api/<resource>": "get all",
      "GET /api/<resource>/:id": "get one by id",
      "POST /api/<resource>": "add new",
      "PUT /api/<resource>/:id": "update by id",
      "DELETE /api/<resource>/:id": "remove by id",
    },
  });
});

// Make sure the database is connected before any API request.
// On a cloud host the first connection attempt can fail, so try again here.
app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(createError(503, `Database connection failed: ${err.message}`));
  }
});

// API routes
app.use("/", referenceRoutes);
app.use("/", projectRoutes);
app.use("/", serviceRoutes);
app.use("/", userRoutes);

// Any request that did not match a route above ends up here
app.use((req, res, next) => {
  next(createError(404, `Endpoint ${req.method} ${req.originalUrl} not found.`));
});

// Global error handler: must be the last middleware
app.use(errorCtrl.handleError);

export default app;

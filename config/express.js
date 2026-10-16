import express from "express";
import cors from "cors";
import morgan from "morgan";
import createError from "http-errors";
import errorCtrl from "../controllers/error.controller.js";

const app = express();

// Log every request in the console (method, url, status, response time)
app.use(morgan("dev"));

// Allow requests from other origins, e.g. the React frontend
app.use(cors());

// Read JSON and form data from the request body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Portfolio backend." });
});

// Any request that did not match a route above ends up here
app.use((req, res, next) => {
  next(createError(404, `Endpoint ${req.method} ${req.originalUrl} not found.`));
});

// Global error handler: must be the last middleware
app.use(errorCtrl.handleError);

export default app;

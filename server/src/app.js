import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express();

// Body parsers (ONLY ONCE)
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Cookies
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api", userRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

export { app };

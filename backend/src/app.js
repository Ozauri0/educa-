import express from "express";
import morgan from "morgan";
import cors from "cors";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(
	cors({
		origin: "http://localhost:8100",
	})
);
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/", authRoutes);

export default app;

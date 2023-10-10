import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(
	cors({
		origin: "http://localhost:8100",
		credentials: true,
	})
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/", authRoutes);

export default app;

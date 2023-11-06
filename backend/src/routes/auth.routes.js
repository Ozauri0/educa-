import {
	register,
	login,
	sendEmail,
	getDocentes,
	getDocente,
	getForumPosts,
	verifyToken,
	logout,
	getNotificaciones,
} from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getDocentes);

router.get("/foro", getForumPosts);

router.get("/docente/:id", getDocente);

router.post("/register", register);

router.post("/login", login);

router.get("/verify", verifyToken);

router.post("/logout", verifyToken, logout);

router.post("/notificaciones", getNotificaciones);

export default router;

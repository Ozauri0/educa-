import {
	register,
	login,
	sendEmail,
	getDocentes,
	getDocente,
	getForumPosts,
	verifyToken,
	logout,
} from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.get("/",ensureToken, getDocentes);

router.get("/foro", getForo);

router.get("/foro", getForumPosts);

router.get("/docente/:id", getDocente);

router.post("/register", register);

router.post("/login", login, sendEmail);

router.get("/verify", verifyToken);

router.post("/logout", verifyToken, logout);

export default router;

import {
	register,
	login,
	sendEmail,
	getDocentes,
	getDocente,
	verifyToken,
	getNotificaciones,
	getForum,
	npost,
	logout,
} from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getDocentes);

router.get("/foro", getForum);

router.get("/ForoPost/:id", getPost);

router.get("/docente/:id", getDocente);

router.post("/register", register);

router.post("/foronuevo", npost);

router.post("/login", login);

router.get("/verify", verifyToken);

router.post("/logout", verifyToken, logout);

router.post("/notificaciones", getNotificaciones);

export default router;

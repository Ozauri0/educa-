import {
	register,
	login,
	getDocentes,
	getDocente,
} from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getDocentes);
router.get("/docente/:id", getDocente);
router.post("/register", register);
router.post("/login", login);

export default router;

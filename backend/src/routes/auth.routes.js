import {
	register,
	login,
	getDocentes,
	getDocente,
	verifyToken,
	getForum,
	getPost,
	npost,
	logout,
	getPostComments,
	ncomment,
	getHorario,
	getNotif,
	postNotif,

} from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getDocentes);

router.get("/comentarios/:id", getPostComments);

router.post("/ncomentario", ncomment);

router.get("/horario/:id", getHorario);

router.get("/foro", getForum);

router.get("/ForoPost/:id", getPost);

router.get("/docente/:id", getDocente);

router.post("/register", register);

router.post("/foronuevo", npost);

router.post("/login", login);

router.get("/verify", verifyToken);

router.post("/logout", verifyToken, logout);

router.get("/notificaciones/:id", getNotif);

router.post("/nnotificacion", postNotif);

export default router;

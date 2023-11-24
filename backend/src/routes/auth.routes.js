import {
	register,
	login,
	getDocentes,
	getDocente,
	getForumPosts,
	verifyToken,
	logout,
	npost,
	getPost,
	getUsers,
	getHorario,
	getNotificaciones,
	registerCurso,
	getCursos,
	registerInscripcion,
	getInscripciones,
	deleteUser,
	registerNewCurso
	,deleteCurso,
	uploadFile,
	getCurso,
	ncomment,
	getPostComments,
	updateCurso,
	deleteFile,
	insNotificacion,
	getFiles
} from "../controllers/auth.controller.js";

import { uploadBanner, uploadResource } from "../middlewares/storageConfigs.js";
import { Router } from "express";
import path from "path";
import fs from 'fs';

const router = Router();

const upload1 = uploadResource();
const upload2 = uploadBanner();

router.get("/", getDocentes);

router.get("/horario/:id", getHorario);

router.post("/notificaciones/", getNotificaciones);

router.get("/foro", getForumPosts);

router.get("/Eliminar", getUsers);

router.get("/ForoPost/:id", getPost);

router.get("/docente/:id", getDocente);

router.post("/register", register);

router.post("/login", login);

router.post("/foronuevo", npost);

router.get("/verify", verifyToken);

router.post("/logout", verifyToken, logout);

router.post("/curso", registerCurso)

router.get("/curso", getCursos)

router.post("/inscripcion", registerInscripcion)

router.get("/inscripcion/:id", getInscripciones)

router.get("/usuarios", getUsers)

router.get("/eliminar/:id", deleteUser)

router.post("/registerNewCurso", registerNewCurso);

router.get("/deleteCurso/:cursoId", deleteCurso);

router.get("/curso/:id", getCurso)

router.put("/curso/:id", updateCurso)

router.post("/upload/banner/:id", upload2.single('file'), uploadFile)

router.post("/upload/:ruta*", upload1.single('file'), uploadFile)

router.get("/comentarios/:id", getPostComments);

router.post("/ncomentario", ncomment, insNotificacion);

router.get("/horario/:id", getHorario);

router.get('/list-files/curso/:id', getFiles);

router.delete('/delete-file/curso/:id/:fileName', deleteFile)

export default router;

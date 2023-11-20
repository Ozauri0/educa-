import {
	register,
	login,
	getDocentes,
	getDocente,
	verifyToken,
	getNotificaciones,
	getForum,
	getPost,
	npost,
	logout,
	getPostComments,
	ncomment,
	registerCurso,
	getCursos,
	getCurso,
	registerInscripcion,
	getInscripciones,
	uploadFile,
	deleteFile,
	updateCurso
} from "../controllers/auth.controller.js";
import { uploadBanner, uploadResource } from "../middlewares/storageConfigs.js";
import { Router } from "express";
import path from "path";
import fs from 'fs';

const router = Router();

const upload1 = uploadResource();
const upload2 = uploadBanner();

router.get("/", getDocentes);

router.get("/comentarios/:id", getPostComments);

router.post("/ncomentario", ncomment);

router.get("/foro", getForum);

router.get("/ForoPost/:id", getPost);

router.get("/docente/:id", getDocente);

router.post("/register", register);

router.post("/foronuevo", npost);

router.post("/login", login);

router.get("/verify", verifyToken);

router.post("/logout", verifyToken, logout);

router.post("/notificaciones", getNotificaciones);

router.post("/curso", registerCurso)

router.get("/curso", getCursos)

router.post("/inscripcion", registerInscripcion)

router.get("/inscripcion/:id", getInscripciones)

router.get("/curso/:id", getCurso)

router.put("/curso/:id", updateCurso)

router.post("/upload/banner/:id", upload2.single('file'), uploadFile)
router.post("/upload/:ruta*", upload1.single('file'), uploadFile)

router.get('/list-files/curso/:id', (req, res) => {
  const directoryPath = path.join(process.cwd(), '/uploads/cursos/' + req.params.id + '/');
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.status(500).send('Unable to scan directory: ' + err);
    } 
    res.send(files);
  });
});

router.delete('/delete-file/curso/:id/:fileName', deleteFile)

export default router;

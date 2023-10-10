import {
	register,
	login,
	sendEmail,
	getDocentes,
	getDocente,
	getForo,
	ensureToken,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import jwt from "jsonwebtoken";
import transporter from "../helpers/mailer.cjs";

const router = Router();
 
router.post("/login/:email/code", async function (req, res) {

	const { email } = req.params
	console.log(process.env.EMAIL);
	const result = await transporter.sendMail({
		from: process.env.EMAIL,
		to: email,
		subject: "Prueba",
		html: "<h1>Este es un correo de prueba.</h1>",
	})
	res.status(200).json({ ok: true, message: "Email enviado" })

});


router.get("/",ensureToken, getDocentes);

router.get("/foro", getForo);

router.get("/docente/:id", getDocente);

router.post("/register", register);

router.post("/login", login, sendEmail);

export default router;
import {connect} from "../database/db.js";
import transporter from "../helpers/mailer.cjs";
import jwt from "jsonwebtoken";

export const getDocentes = async (req, res) => {
	try {
		const db = await connect();
		const [result] = await db.query("SELECT * FROM docente");
		console.log(result);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Hola Mundo" });
		console.log(error);
		
	}
};

export const getForo = async (req, res) => {
	try {
		const db = await connect();
		const [result] = await db.query("SELECT * FROM foro");
		console.log(result);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Hola Mundo" });
		console.log(error);
		
	}
};

export const getDocente = async (req, res) => {
	try {
		const { id } = req.params;
		const db = await connect();
		const result = await db.query("SELECT * FROM docente WHERE id = ?", id);
		console.log(result[0]);
		res.json(result[0]);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
		console.log(error);
	}
};

export const register = async (req, res) => {
	try {
		const { nombres, apellidos, rut, correo, contrasena, telefono } = req.body;

		if (!nombres || !apellidos || !rut || !correo || !contrasena || !telefono) {
			return res.status(400).json({ message: "Must fill every field" });
		}

		const docente = { nombres, apellidos, rut, correo, contrasena, telefono };
		const db = await connect();
		const [mailExists] = await db.query("SELECT correo FROM docente WHERE correo = ?", [correo]);

		if (mailExists.length > 0) {
			console.log(mailExists);
			return res.status(400).json({ message: "Email already in use" });
		}

		const result = await db.query("INSERT INTO docente SET ?", [docente]);
		res.json(result);

	} catch (error) {
		res.status(500).json({ message: "No se pudo realizar el registro" });
		console.log(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { correo, contrasena } = req.body;
		if (!correo || !contrasena) {
			return res.status(400).json({ message: "Must fill every field" });
		}
		const db = await connect();
		const [result] = await db.query("SELECT id FROM docente WHERE correo = ? AND contrasena = ?", [correo, contrasena]);
		if (result.length != 1) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		
		const datos = await db.query("SELECT nombres, apellidos FROM docente WHERE correo = ?", [correo]);

		const user = datos[0][0].id;
		const token = jwt.sign({ user }, 'my_secret_token');

		console.log("logged in");
		res.status(200).json({ message: "Has iniciado Sesion", token });
		next();
	} catch (error) {
		res.status(500).json({ message: "No se ha podido iniciar Sesion" });
		console.log(error);
	}
};

export const ensureToken = (req, res, next) => {
	const bearerHeader = req.headers["authorization"];
	console.log(bearerHeader);
	if (typeof bearerHeader !== "undefined") {
		const bearerToken = bearerHeader.split(" ")[1];
		req.token = bearerToken;
		next();
	} else {
		res.sendStatus(403);
	}
};

export const sendEmail = async (req, res) => {
		const {correo} = req.body;

		const db = await connect();
		const datos = await db.query("SELECT nombres, apellidos FROM docente WHERE correo = ?", [correo]);
		
		const nombre = datos[0][0].nombres;
		const apellido = datos[0][0].apellidos;	

		const fecha = new Date().toLocaleString();
		
		const mail = await transporter.sendMail({
			from: process.env.EMAIL,
			to: correo,
			subject: "Nuevo inicio de sesion en tu cuenta",
			html: `<p>Hola ${nombre} ${apellido}.</p>
			<p>Acabas de iniciar sesion en tu cuenta de Educa+</p>
			<ul>
				<li>Tu cuenta: ${correo}</li>
				<li>Fecha: ${fecha}</li>
        	</ul>
			<p>Si fuiste tu, entonces no necesitas hacer nada.</p>
			<p>Si no reconoces esta solicitud porfavor contacta al equipo</p>`	
			,});
		return
};
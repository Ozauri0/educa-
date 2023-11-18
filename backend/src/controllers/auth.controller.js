import { connect } from "../database/db.js";
import transporter from "../helpers/mailer.cjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getDocentes = async (req, res) => {
	try {
		const db = await connect();
		const [result] = await db.query("SELECT * FROM docente");
		console.log(result);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Hola Mundo" });
	}
};

export const getForum = async (req,res) => {
	try {
		const db = await connect();
		const [result] = await db.query("SELECT * FROM foro ORDER BY id DESC;");
		res.json(result);
	} catch (error) {
		console.log(error)
		res.status(500).json({message: "Internal server error"});
	}
};

export const npost = async (req,res) => {
	try {
		const {titulo, descripcion, instancia_form_id} = req.body;
		const db = await connect();
		const [result] = await db.query("INSERT INTO foro (titulo, descripcion, instancia_form_id) VALUES (?,?,?)", [titulo, descripcion, instancia_form_id]);
		res.json(result);
	} catch (error) {
		console.log(error)
		res.status(500).json({message: "Internal server error"});
	}
}

export const getPost = async (req,res) => {
	try {
		const postId = req.params.id;
		console.log(postId);
		const db = await connect();
		const [result] = await db.query("SELECT * FROM foro WHERE id = ?", postId);
		res.json(result);
	} catch (error) {
		console.log(error)
		res.status(500).json({message: "Internal server error"});
	}
}

export const ncomment = async (req,res) => {
	try {
		const {nombre_usuario, comentario, id_post} = req.body;
		const db = await connect();
		const [result] = await db.query("INSERT INTO comentarios (nombre_usuario, comentario, id_post) VALUES (?,?,?)", [nombre_usuario, comentario, id_post]);
		res.json(result);
	} catch (error) {
		console.log(error)
		res.status(500).json({message: "Internal server error"});
	}
}

export const getPostComments = async (req,res) => {
	try {
		const postId = req.params.id;
		const db = await connect();
		const [result] = await db.query("SELECT * FROM comentarios WHERE id_post = ?", postId);
		res.json(result);
	} catch (error) {
		console.log(error)
		res.status(500).json({message: "Internal server error"});
	}
}


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
		const { nombres, apellidos, rut, correo, telefono } = req.body;
		const {contrasena} = req.body;

		if (!nombres || !apellidos || !rut || !correo || !contrasena || !telefono) {
			return res.status(400).json({ message: "Must fill every field" });
		}

		const docente = { nombres, apellidos, rut, correo, contrasena, telefono };
		const db = await connect();
		const [mailExists] = await db.query(
			"SELECT correo FROM docente WHERE correo = ?",
			[correo]
		);

		if (mailExists.length > 0) {
			console.log(mailExists);
			return res.status(400).json({ message: "Email already in use" });
		}
		
		const saltRounds = 10;
		const result = await db.query("INSERT INTO docente SET ?", [docente]);
		bcrypt.genSalt(saltRounds, function(err, salt) {
			bcrypt.hash(contrasena, salt, async function(err, hash) {
				await db.query("UPDATE docente SET contrasena = ? WHERE correo = ?", [hash, correo]);
			});
		});
		
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: "No se pudo realizar el registro" });
		console.log(error);
	}
};

export const login = async (req, res) => {
	try {
		const { correo, contrasena } = req.body;
		if (!correo || !contrasena) {
			return res.status(400).json({ message: "Must fill every field" });
		}
		const db = await connect();
		const dbcontrasena = await db.query(
			"SELECT contrasena FROM docente WHERE correo = ?", [correo]
		);

		bcrypt.compare(contrasena, dbcontrasena, async function(err, resultado) {
			console.log("Logged in as: ", result[0]);
			if (result.length != 1) {
				return res.status(400).json({ message: "Invalid credentials" });
			}
			const datos = await db.query(
				"SELECT nombres, apellidos FROM docente WHERE correo = ?",
				[correo]
			);
			const token = await createAccessToken({
				result,
			});
			res.cookie("token", token, {
				httpOnly: false,
				sameSite: "none",
				secure: true,
			});
			res.status(200).json(result[0]);
	
			console.log("logged in");
		  });

		// const datos = await db.query("SELECT nombres, apellidos FROM docente WHERE correo = ?", [correo]);
		// const nombre = datos[0][0].nombres;
		// const apellido = datos[0][0].apellidos;
		// const fecha = new Date().toLocaleString();
		// const mail = await transporter.sendMail({
		// 	from: process.env.EMAIL,
		// 	to: correo,
		// 	subject: "Nuevo inicio de sesion en tu cuenta",
		// 	html: `<p>Hola ${nombre} ${apellido}.</p>
		// 	<p>Acabas de iniciar sesion en tu cuenta de Educa+</p>
		// 	<ul>
		// 		<li>Tu cuenta: ${correo}</li>
		// 		<li>Fecha: ${fecha}</li>
		//     	</ul>
		// 	<p>Si fuiste tu, entonces no necesitas hacer nada.</p>
		// 	<p>Si no reconoces esta solicitud porfavor contacta al equipo</p>`

		// 	,});
		// return
	} catch (error) {
		res.status(500).json({ message: "No se ha podido iniciar Sesion" });
		console.log(error);
	}
};

// export const ensureToken = (req, res, next) => {
// 	const bearerHeader = req.headers["authorization"];
// 	console.log(bearerHeader);
// 	if (typeof bearerHeader !== "undefined") {
// 		const bearerToken = bearerHeader.split(" ")[1];
// 		req.token = bearerToken;
// 		next();
// 	} else {
// 		res.sendStatus(403);
// 	}
// };

export const sendEmail = async (req, res) => {
	const { correo } = req.body;

	const db = await connect();
	const datos = await db.query(
		"SELECT nombres, apellidos FROM docente WHERE correo = ?",
		[correo]
	);

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
			<p>Si no reconoces esta solicitud porfavor contacta al equipo</p>`,
	});
	return;
};
export const verifyToken = async (req, res) => {
	const { token } = req.cookies;
	if (!token) {
		return res.status(401).json({ message: "No token provided" });
	}
	jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
		if (err) {
			console.log(err);
			return res.status(401).json({ message: "Unauthorized" });
		}
		const db = await connect();
		console.log("User id:", user.result[0].id);
		const [userFound] = await db.query("SELECT * FROM docente WHERE id = ?", [
			user.result[0].id,
		]);
		if (!userFound) {
			return res.status(401).json({ message: "No user found" });
		}
		return res.status(200).json(userFound[0]); // Aquí devolvemos los datos del usuario
	});
};

export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ message: "Has cerrado sesion" });
};

export const getNotificaciones = async (req, res) => {
	const { correo } = req.body;
	try {
		const db = await connect();
		console.log("Correo", correo);
		const [result] = await db.query(
			"SELECT * FROM notificaciones WHERE usuario = ?",
			[correo]
		);
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const insNotificacion = async (req, res) => {
	
	console.log(req.body);
	const { usuario, mensaje } = req.body;
	try {
		const db = await connect();
		const result = await db.query(
			"INSERT INTO notificaciones (usuario, de, accion, mensaje) VALUES (?, ?, ?)",
			[usuario, mensaje, fecha]
		);
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

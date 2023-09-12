import { db } from "../database/db.js";

export const getDocentes = async (req, res) => {
	try {
		const [result] = await db.query("SELECT * FROM docente");
		console.log(result);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
		res(error.message);
	}
};
export const getDocente = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await db.query("SELECT * FROM docente WHERE id = ?", id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
		res(error.message);
	}
};

export const register = async (req, res) => {
	try {
		const { nombres, apellidos, correo, contrasena, telefono } = req.body;

		if (!nombres || !apellidos || !correo || !contrasena || !telefono) {
			return res.status(400).json({ message: "Must fill every field" });
		}

		const docente = { nombres, apellidos, correo, contrasena, telefono };
		const [mailExists] = await db.query(
			"SELECT correo FROM docente WHERE correo = ?",
			[correo]
		);
		console.log(mailExists);
		if (mailExists.length > 0) {
			return res.status(400).json({ message: "Email already in use" });
		}

		const result = await db.query("INSERT INTO docente SET ?", [docente]);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
		res(error.message);
	}
};

export const login = async (req, res) => {
	try {
		const { correo, contrasena } = req.body;
		if (!correo || !contrasena) {
			return res.status(400).json({ message: "Must fill every field" });
		}
		const [result] = await db.query(
			"SELECT * FROM docente WHERE correo = ? AND contrasena = ?",
			[correo, contrasena]
		);

		if (result.length != 1) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		return res.status(200).json({ message: "Logged in" });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
		res(error.message);
	}
};

import jwt from "jsonwebtoken";

export function createAccessToken(payload) {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
<<<<<<< HEAD
			process.env.JWT_SECRET,	
			{expiresIn: "1d"},
=======
			process.env.JWT_SECRET,
			{
				expiresIn: "1d",
			},
>>>>>>> Main
			(err, token) => {
				if (err) {
					console.log(err);
					reject("No se pudo generar el token");
				}
				resolve(token);
			}
		);
	});
}

import mysql from "mysql2/promise.js";
import config from "../config.js";
import "dotenv/config";
import { configDotenv } from "dotenv";
configDotenv();

<<<<<<< HEAD
=======
// export const db = createPool(config);

// Creo que no es necesario que sea una función asíncrona

>>>>>>> Main
export const connect = async () => {
	return await mysql.createConnection(config);
};

<<<<<<< HEAD
// export const db = createPool(config);
// Creo que no es necesario que sea una función asíncrona
=======
>>>>>>> Main
// export const db = createPool({
// 	host: config.host,
// 	database: config.database,
// 	user: config.user,
// 	password: config.password,
// });

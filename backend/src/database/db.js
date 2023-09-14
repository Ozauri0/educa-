import { createPool } from "mysql2/promise.js";
import config from "../config.js";

export const db = createPool(config);

// Creo que no es necesario que sea una función asíncrona

// export const connect = async () => {
// 	return await mysql.createConnection(config);
// };

// export const db = createPool({
// 	host: config.host,
// 	database: config.database,
// 	user: config.user,
// 	password: config.password,
// });

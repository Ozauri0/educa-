import { createPool } from "mysql2/promise.js";
import config from "../config.js";

export const db = createPool({
	host: config.host,
	database: config.database,
	user: config.user,
	password: config.password,
});

// const connect = () => {
// 	return connection;
// };

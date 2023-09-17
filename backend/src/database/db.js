import mysql from "mysql2/promise.js";
import config from "../config.js";
import 'dotenv/config';
import { configDotenv } from "dotenv";
configDotenv();

export const connect = async () => {
		return await mysql.createConnection(config);
	}
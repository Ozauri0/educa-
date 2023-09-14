import { config } from "dotenv";

config();

export default {
	host: process.env.HOST || "localhost",
	database: process.env.DATABASE || "",
	user: process.env.USER || "root",
	password: process.env.PASSWORD || "",
};

// export const config = {
// 	host: "127.0.0.1",
// 	user: "root",
// 	password: "",
// 	database: "educa+",
// };
// export default config;

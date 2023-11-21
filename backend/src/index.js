import app from "./app.js";
import { Server } from "socket.io";

const main = () => {
	app.listen(app.get("port"));
	
	console.log("Server on port", app.get("port"));
	console.log("Mail", process.env.PORT);
};

main();

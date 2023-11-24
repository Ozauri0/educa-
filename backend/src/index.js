import app from "./app.js";
<<<<<<< HEAD
=======
import { Server } from "socket.io";
>>>>>>> Main

const main = () => {
	app.listen(app.get("port"));
	
	console.log("Server on port", app.get("port"));
	console.log("Mail", process.env.PORT);
};

<<<<<<< HEAD
main();
=======
main();
>>>>>>> Main

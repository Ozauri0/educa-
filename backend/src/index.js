import app from "./app.js";
import "./database/db.js";

const main = () => {
	app.listen(app.get("port"));
	console.log("Server on port", app.get("port"));
};

main();

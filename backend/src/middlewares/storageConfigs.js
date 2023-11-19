import multer from "multer";
import path from "path";
import fs from 'fs';

export const uploadResource = () => {
	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			// Obtén la ruta desde la que se envía el archivo
			const {ruta, ...rest} = req.params;
			const routeSegments = Object.values(rest);
			const route = [ruta, ...routeSegments].join('');
			console.log("ROUTE: ", route);
			// Define the directory path
			const dir = 'uploads/' + route + '/';
	
			// Create directory if it doesn't exist
			fs.mkdirSync(dir, { recursive: true });
	
			// Use that route as the destination folder
			cb(null, dir);
		},
		filename: function (req, file, cb) {
			// Use the original file name + Date.now() to make it unique
			cb(null, file.originalname);
		}
	});
	
	const upload = multer({ 
		storage: storage	});

	return upload;
}

export const uploadBanner = () => {
	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			// Obtén la ruta desde la que se envía el archivo
			const { id } = req.params;
			console.log("PARAMS: ", id);
			// console.log("ROUTE: ", route);
			// Define the directory path
			const dir = `uploads/cursos/${id}/`;
	
			// Create directory if it doesn't exist
			fs.mkdirSync(dir, { recursive: true });
	
			// Use that route as the destination folder
			cb(null, dir);
		},
		filename: function (req, file, cb) {
			// Use the original file name + Date.now() to make it unique
			cb(null, `banner${path.extname(file.originalname)}`);
		}
	});
	
	const upload = multer({ 
		storage: storage, 
		fileFilter: function (req, file, cb) {
			// Accept image files only
			if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
				return cb(new Error('Only image files are allowed!'), false);
			}
			cb(null, true);
		},
	});

	return upload;
}
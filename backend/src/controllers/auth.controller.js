import { connect } from "../database/db.js";
import transporter from "../helpers/mailer.cjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";


export const getBanner = async (req, res) => {
	try {
		const { id } = req.params;
		const db = await connect();
		const [result] = await db.query("SELECT * FROM banner WHERE id_curso = ?", [
			id,
		]);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export const uploadFile = async (req, res) => {
	// save the file on the server instead of saving it on database
	try {
		const file = req.file
		console.log("File:",file);
		res.status(200).json({ message: "File uploaded successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function getInscripciones(req, res) {
	try {
		const db = await connect();
		console.log(req.params)
		const id_docente = req.params.id;
		const [result] = await db.query('SELECT * FROM inscripciones WHERE id_docente = ?',
		[id_docente]);
		res.json(result)
	} catch (error) {
		console.error(error);
    throw error;
	}
}

export async function registerInscripcion(req, res) {
	try {
		const db = await connect();
		const { id_curso, id_docente } = req.body;

		// Verificar si ya está inscrito
		const existingInscripcion = await db.query(
			"SELECT * FROM inscripciones WHERE id_curso = ? AND id_docente = ?",
			[id_curso, id_docente]
		);

		if (existingInscripcion[0].length > 0) {
			// Ya está inscrito, realizar la desinscripción eliminando la entrada existente
			const [result] = await db.query("DELETE FROM inscripciones WHERE id_curso = ? AND id_docente = ?", [id_curso, id_docente]);
			console.log("Desinscripción realizada!");
			return res.json(result);
		}
		
		const [cursoInfo] = await db.query(
      "SELECT limite_cupos, COUNT(id_inscripcion) AS inscripciones_actuales FROM cursos LEFT JOIN inscripciones ON cursos.id = inscripciones.id_curso WHERE cursos.id = ? GROUP BY cursos.id",
      [id_curso]
    );

		const { limite_cupos, inscripciones_actuales } = cursoInfo[0];
    const cupos_restantes = limite_cupos - inscripciones_actuales;

		if (cupos_restantes > 0) {
			// Si no está inscrito, realizar la inserción
			const [result] = await db.query("INSERT INTO inscripciones (id_curso, id_docente) VALUES (?,?)", [id_curso, id_docente]);
			console.log("Inscripción realizada!");
			res.json(result);
		}
		else {
			// No hay cupos restantes, devolver un mensaje indicando que no se puede inscribir
      res.status(400).json({ error: "No quedan cupos disponibles para este curso" });
		}
		} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error en la inscripcion" });
	}
}

export async function getCurso(req, res) {
	try {
		const db = await connect();
		const { id } = req.params;
		// Obtener el curso con la cantidad de inscripciones actuales
    const [result] = await db.query(`
      SELECT cursos.*, COUNT(inscripciones.id_inscripcion) AS inscripciones_actuales
      FROM cursos
      LEFT JOIN inscripciones ON cursos.id = inscripciones.id_curso
      WHERE cursos.id = ?
      GROUP BY cursos.id
    `, [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    const cursoConCuposRestantes = {
      ...result[0],
      cupos_restantes: result[0].limite_cupos - result[0].inscripciones_actuales,
    };

    return res.json(cursoConCuposRestantes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getCursos(req, res) {
	try {
		const db = await connect();
		const [result] = await db.query(`
			SELECT cursos.*, COUNT(inscripciones.id_inscripcion) AS inscripciones_actuales
			FROM cursos
			LEFT JOIN inscripciones ON cursos.id = inscripciones.id_curso
			GROUP BY cursos.id
	`	);
		const cursosConCuposRestantes = result.map((curso) => {
			const cupos_restantes = curso.limite_cupos - curso.inscripciones_actuales;
			return { ...curso, cupos_restantes };
	});
		return res.json(cursosConCuposRestantes);
	} catch (error) {
		console.log(error)
		res.status(500).json({message: "Internal server error"});
	}
}

export const registerCurso = async (req, res) => {
	try {
		const { nombre_curso, descripcion, limite_cupos, fecha_inicio, fecha_termino } = req.body;
		const db = await connect();
		const [result] = await db.query(
			"INSERT INTO cursos (nombre_curso, descripcion, limite_cupos, fecha_inicio, fecha_termino) VALUES (?,?,?,?,?)",
			[nombre_curso, descripcion, limite_cupos, fecha_inicio, fecha_termino]
		);
		console.log("Curso registrado!")
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error en el registro de curso" });
	}
}




export const getDocentes = async (req, res) => {
	try {
		const db = await connect();
		const [result] = await db.query("SELECT * FROM docente");
		console.log(result);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Hola Mundo" });
		console.log(error);
	}
};

export const getForumPosts = async (req, res) => {
	try {
		const db = await connect();
		const [result] = await db.query("SELECT * FROM foro");
		console.log(result);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getDocente = async (req, res) => {
	try {
		const { id } = req.params;
		const db = await connect();
		const result = await db.query("SELECT * FROM docente WHERE id = ?", id);
		console.log(result[0]);
		res.json(result[0]);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
		console.log(error);
	}
};

export const register = async (req, res) => {
	try {
		const { nombres, apellidos, rut, correo, telefono } = req.body;
		const {contrasena} = req.body;

		if (!nombres || !apellidos || !rut || !correo || !contrasena || !telefono) {
			return res.status(400).json({ message: "Must fill every field" });
		}

		const docente = { nombres, apellidos, rut, correo, contrasena, telefono };
		const db = await connect();
		const [mailExists] = await db.query(
			"SELECT correo FROM docente WHERE correo = ?",
			[correo]
		);

		if (mailExists.length > 0) {
			console.log(mailExists);
			return res.status(401).json({ error: 'Correo ya se encuentra en uso' });
		}
		
		const saltRounds = 10;
		const result = await db.query("INSERT INTO docente SET ?", [docente]);
		bcrypt.genSalt(saltRounds, function(err, salt) {
			bcrypt.hash(contrasena, salt, async function(err, hash) {
				await db.query("UPDATE docente SET contrasena = ? WHERE correo = ?", [hash, correo]);
			});
		});
		
		return res.status(201).json({ message: "Usuario registrado" });
	} catch (error) {
		res.status(500).json({ error: "No se pudo realizar el registro" });
		console.log(error);
	}
};


export const login = async (req, res) => {
	try {
			const { correo, contrasena } = req.body;
			if (!correo || !contrasena) {
					return res.status(401).json({ error: "Debe completar todos los campos" });
			}
			
			const db = await connect();
			const [result] = await db.query("SELECT * FROM docente WHERE correo = ?", correo);
			
			if (!result || result.length !== 1) {
					return res.status(401).json({ error: "Credenciales inválidas" });
			}
			
			const storedHash = result[0].contrasena;
			
			bcrypt.compare(contrasena, storedHash, async function(err, resultado) {
					if (err) {
							return res.status(401).json({ error: "Error al comparar contraseñas" });
					}
					
					if (resultado) {
							// Contraseña válida, se puede autenticar al usuario
							const { nombres, apellidos } = result[0];
							const token = await createAccessToken({ result });
							
							res.cookie("token", token);
							
							res.status(200).json({ nombres, apellidos, correo });
					} else {
							// Contraseña inválida
							res.status(401).json({ error: "Credenciales inválidas" });
					}
			});
	} catch (error) {
			res.status(500).json({ error: "No se ha podido iniciar sesión" });
			console.log(error);
	}
};

export const verifyToken = async (req, res) => {
	const { token } = req.cookies;
	if (!token) {
		return res.status(401).json({ message: "No token provided" });
	}
	jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
		if (err) {
			console.log(err);
			return res.status(401).json({ message: "Unauthorized" });
		}
		const db = await connect();
		console.log("User id:", user.result[0].id);
		const [userFound] = await db.query("SELECT * FROM docente WHERE id = ?", [
			user.result[0].id,
		]);
		if (!userFound) {
			return res.status(401).json({ message: "No user found" });
		}
		return res.status(200).json(userFound[0]); // Aquí devolvemos los datos del usuario
	});
};

export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ message: "Has cerrado sesion" });
};
export const getForum = async (req,res) => {
	try {
		const db = await connect();
		const [result] = await db.query("SELECT * FROM foro ORDER BY id DESC;");
		res.json(result);
	} catch (error) {
		console.log(error)
		res.status(500).json({message: "Internal server error"});
	}
};

export const npost = async (req,res) => {
	try {
		const {titulo, descripcion, id_autor, autor} = req.body;
		const db = await connect();
		const [result] = await db.query("INSERT INTO foro (titulo, descripcion, id_autor, autor) VALUES (?,?,?,?)", [titulo, descripcion, id_autor, autor]);
		res.json(result);
	} catch (error) {
		console.log(error)
		res.status(500).json({message: "Internal server error"});
	}
}

export const getPost = async (req,res) => {
	try {
		const postId = req.params.id;
		console.log(postId);
		const db = await connect();
		const [result] = await db.query("SELECT * FROM foro WHERE id = ?", postId);
		res.json(result);
	} catch (error) {
		console.log(error)
		res.status(500).json({message: "Internal server error"});
	}
}
export const getNotificaciones = async (req, res) => {
	const { id } = req.body;
	try {
		const db = await connect();
		console.log("Correo", id);
		const [result] = await db.query(
			"SELECT * FROM notificaciones WHERE usuario_id = ?",
			[id]
		);
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const insNotificacion = async (req, res) => {
	const {id_usuario, nombre_usuario, comentario, id_post, id_autor} = req.body;
    try {
        const db = await connect();
        const [result] = await db.query("INSERT INTO notificaciones (usuario_id, de_id, accion, mensaje) VALUES (?,?,?,?)", [id_autor, id_usuario, "Comento en tu post con el siguiente mensaje:", comentario ]);
        console.log("Notificación insertada correctamente");
        return result;
    } catch (error) {
        console.log(error);
        return error;
}
 };

export const getUsers = async (req, res) => {
	try {
	  const db = await connect();
	  const result = await db.query('SELECT id,nombres, apellidos, rut FROM docente');
	  res.json(result);
	} catch (error) {
	  console.log(error);
	  res.status(500).json({ message: 'Internal server error' });
	}
  };

  export const deleteUser = async (req, res) => {
	const { id } = req.params;
  
	try {
	  const db = await connect();
	  await db.query('DELETE FROM docente WHERE id = ?', [id]);
	  res.json({ message: 'Usuario eliminado correctamente' });
	} catch (error) {
	  console.log(error);
	  res.status(500).json({ message: 'Internal server error' });
	}
  };

  export const getHorario = async (req,res) => {
	try {
		const db = await connect();
		const id_docente = req.params.id;
		const [result] = await db.query("SELECT * FROM horarios_clase WHERE id_docente = ?", id_docente);
		res.json(result);
	}catch (error) {
		console.log(error)
		res.status(500).json({message: "Error DB"});
	}
}


export const registerNewCurso = async (req, res) => {
  const { nombre_curso, descripcion, limite_cupos, fecha_inicio, fecha_termino } = req.body;
  const id_asesor = 0; // De momento, asumimos que el id del asesor es siempre 0

  try {
    const db = await connect();
    await db.query('INSERT INTO cursos (nombre_curso, descripcion, limite_cupos, fecha_inicio, fecha_termino, id_asesor) VALUES (?, ?, ?, ?, ?, ?)', [nombre_curso, descripcion, limite_cupos, fecha_inicio, fecha_termino, id_asesor]);
    res.json({ message: 'Curso agregado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteCurso = async (req, res) => {
	const { cursoId } = req.params;
  
	try {
	  const db = await connect();
	  await db.query('DELETE FROM cursos WHERE id = ?', [cursoId]);
	  res.json({ message: 'Curso eliminado correctamente' });
	} catch (error) {
	  console.log(error);
	  res.status(500).json({ message: 'Error interno del servidor' });
	}
  };

  export const ncomment = async (req, res, next) => {
	try {
		const {id_usuario, nombre_usuario, comentario, id_post, id_autor} = req.body;
		const db = await connect();
		const [result] = await db.query("INSERT INTO comentarios (id_usuario, nombre_usuario, comentario, id_post, id_autor) VALUES (?,?,?,?,?)", [id_usuario, nombre_usuario, comentario, id_post, id_autor]);
		res.json(result);
		next();
	} catch (error) {
		console.log(error)
		res.status(500).json({message: "Internal server error"});
	}
}

export const getPostComments = async (req,res) => {
	try {
		const postId = req.params.id;
		const db = await connect();
		const [result] = await db.query("SELECT * FROM comentarios WHERE id_post = ?", postId);
		res.json(result);
	} catch (error) {
		console.log(error)
		res.status(500).json({message: "Internal server error"});
	}
}

export const updateCurso = async (req, res) => {
	try {
		const { id } = req.params;
		const { nombre_curso, descripcion, limite_cupos, fecha_inicio, fecha_termino } = req.body;
		const db = await connect();
		const [result] = await db.query(
			"UPDATE cursos SET nombre_curso = ?, descripcion = ?, limite_cupos = ?, fecha_inicio = ?, fecha_termino = ? WHERE id = ?",
			[nombre_curso, descripcion, limite_cupos, fecha_inicio, fecha_termino, id]
		);
		console.log("Curso actualizado!")
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error en la actualización del curso" });
	}
}

export const deleteFile = async (req, res) => {
	try {
		const { id, fileName } = req.params;
		const filePath = path.join(process.cwd(), `uploads/cursos/${id}/${fileName}`)
		// Verificar si el archivo existe
		console.log("FILE PATH:",filePath)
    fs.access(filePath, fs.constants.F_OK, (err) => {
			if (err) {
					res.status(404).send('El archivo no existe');
			} else {
					// Eliminar el archivo
					fs.unlink(filePath, (err) => {
							if (err) {
									res.status(500).send('Error al eliminar el archivo');
							} else {
									res.status(200).send('Archivo eliminado exitosamente');
							}
					});
			}
	});
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}
export interface User {
<<<<<<< HEAD
  id?: number;
=======
	id?: number;
>>>>>>> Main
	nombres?: string;
	apellidos?: string;
	rut?: string;
	telefono?: string;
	correo?: string;
	contrasena?: string;
}

export interface AuthContextType {
<<<<<<< HEAD
  currentUser: User | null;
  isAuthenticated: boolean;
  signin: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

export type Notificacion = {
	id: number;
	mensaje: string;
	usuario: string;
	de: string;
	fecha: string;
	accion: string;
=======
	currentUser: User | null;
	isAuthenticated: boolean;
	signin: (user: User) => Promise<boolean>; // Cambio a Promise<boolean>
	signup: (user: User) => Promise<any>; // Cambio a Promise<boolean>
	logout: () => void;
	loading: boolean;
}

export type Notificacion = {
    id: number;
    mensaje: string;
    usuario_id: number;
    de_id: number;
    de_autor: string;
    fecha: string;
    accion: string;
}

export type Curso = {
	id: any;
	nombre_curso: string;
	descripcion: string;
	limite_cupos: number;
	fecha_inicio: string;
	fecha_termino: string;
	id_asesor?: number;
	cupos_restantes?: number;
};

export type Inscripcion = {
	id_inscripcion?: number;
	id_curso: number;
	id_docente: number | undefined;
	fecha_inscripcion?: string;
>>>>>>> Main
}
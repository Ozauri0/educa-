import axios from "axios";
<<<<<<< HEAD
import { User } from "../types";
=======
import { Curso, Inscripcion, User } from "../types";
>>>>>>> Main

const instance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export const registerRequest = async (user: User) => instance.post(`/api/register`, user);

export const loginRequest = async (user: User) => instance.post(`/api/login`, user);

export const verifyTokenRequest = async () => instance.get(`/api/verify`);

<<<<<<< HEAD
export const getNotifRequest = async (usuario: User) => instance.post(`/api/notificaciones`, usuario);

export const getForo = async (usuario: User) => instance.post(`/api/notificaciones2`, usuario);

export const getForoCom = async (usuario: User) => instance.get(`/api/notificaciones3/id: ${usuario.id}`);
=======
export const getNotifRequest = async (id: any) => instance.post(`/api/notificaciones`, id);

export const registerCurso = async (curso: Curso) => instance.post(`/api/curso`, curso);

export const getCursos = async () => instance.get(`/api/curso`);

export const getUsers = async () => instance.get(`/api/usuarios`);

export const deleteUser = async (id: string) => instance.delete(`/api/eliminar/${id}`);

export const registerNewCurso = async (curso: Curso) => instance.post(`/api/registerNewCurso`, curso);

export const deleteCurso = async (cursoId: string) => instance.get(`/api/deleteCurso/${cursoId}`);

export const registerInscripcion = async (inscripcion: Inscripcion) => instance.post(`/api/inscripcion`, inscripcion);

export const getInscripciones = async (id_docente: number | undefined) => instance.get(`/api/inscripcion/${id_docente}`);

export const getCurso = async (id_curso: string) => instance.get(`/api/curso/${id_curso}`);

export const getForo = async (usuario: User) => instance.post(`/api/notificaciones2`, usuario);

export const getForoCom = async (usuario: User) => instance.get(`/api/notificaciones3/id: ${usuario.id}`);




// export const registerInscripcion = async (inscripcion: Inscripcion) => instance.post(`/api/inscripcion`, inscripcion);

// export const getInscripciones = async () => instance.get(`/api/inscripcion/${id_docente}`);
>>>>>>> Main

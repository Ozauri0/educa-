import axios from "axios";
import { Curso, Inscripcion, User } from "../types";

const instance = axios.create({
  baseURL: "http://192.168.1.4:4000",
  withCredentials: true,
});

export const registerRequest = async (user: User) => instance.post(`/api/register`, user);

export const loginRequest = async (user: User) => instance.post(`/api/login`, user);

export const verifyTokenRequest = async () => instance.get(`/api/verify`);

export const getNotifRequest = async (usuario: User) => instance.post(`/api/notificaciones`, usuario);

export const registerCurso = async (curso: Curso) => instance.post(`/api/curso`, curso);

export const getCursos = async () => instance.get(`/api/curso`);

export const registerInscripcion = async (inscripcion: Inscripcion) => instance.post(`/api/inscripcion`, inscripcion);

export const getInscripciones = async (id_docente: number | undefined) => instance.get(`/api/inscripcion/${id_docente}`);

export const getCurso = async (id_curso: string) => instance.get(`/api/curso/${id_curso}`);

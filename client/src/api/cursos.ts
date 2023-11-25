import axios from "axios";
import { Curso, Inscripcion } from "../types";

const instance = axios.create({
	baseURL: "http://192.168.1.4:4000",
	withCredentials: true,
});

export const registerNewCurso = async (curso: Curso) => instance.post(`/api/registerNewCurso`, curso);

// no se esta usando
export const registerCurso = async (curso: Curso) => instance.post(`/api/curso`, curso);

export const registerInscripcion = async (inscripcion: Inscripcion) => instance.post(`/api/inscripcion`, inscripcion);

export const getCurso = async (id: string) => instance.get(`/api/curso/${id}`)

export const getCursos = async () => instance.get(`/api/curso`);

export const getInscripciones = async (id_docente: string | number) => instance.get(`/api/inscripcion/${id_docente}`);

export const updateCurso = async (id: string, cursoData: any) => instance.put(`/api/curso/${id}`, cursoData);

export const deleteCurso = async (cursoId: string) => instance.get(`/api/deleteCurso/${cursoId}`);



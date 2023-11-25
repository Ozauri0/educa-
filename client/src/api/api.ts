import axios from "axios";
import { User } from "../types";

const instance = axios.create({
  baseURL: "http://192.168.1.4:4000",
  withCredentials: true,
});

export const getUsers = async () => instance.get(`/api/usuarios`);

export const getHorarios = async (id: string | number) => instance.get(`/api/horario/${id}`);

export const getForo = async (usuario: User) => instance.post(`/api/notificaciones2`, usuario);

export const getForoCom = async (usuario: User) => instance.get(`/api/notificaciones3/id: ${usuario.id}`);

export const getNotifRequest = async (usuario: User) => instance.post(`/api/notificaciones`, usuario);

export const deleteUser = async (id: string) => instance.delete(`/api/eliminar/${id}`);

export const uploadFile = async (ruta: string, fileData: any) => instance.post(`/api/upload/${ruta}`, fileData);

export const getFiles = async (id: string) => instance.get(`/api/list-files/curso/${id}`);

export const deleteFile = async (id: string, fileName: string) => instance.delete(`/api/delete-file/${id}/${fileName}`);
// export const registerInscripcion = async (inscripcion: Inscripcion) => instance.post(`/api/inscripcion`, inscripcion);

// export const getInscripciones = async () => instance.get(`/api/inscripcion/${id_docente}`);
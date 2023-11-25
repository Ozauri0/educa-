import axios from "axios";
import { User } from "../types";

const instance = axios.create({
  baseURL: "http://192.168.1.4:4000",
  withCredentials: true,
});

export const registerRequest = async (user: User) => instance.post(`/api/register`, user);

export const loginRequest = async (user: User) => instance.post(`/api/login`, user);

export const verifyTokenRequest = async () => instance.get(`/api/verify`);

// export const registerInscripcion = async (inscripcion: Inscripcion) => instance.post(`/api/inscripcion`, inscripcion);

// export const getInscripciones = async () => instance.get(`/api/inscripcion/${id_docente}`);
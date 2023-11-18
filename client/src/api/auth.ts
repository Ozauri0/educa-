import axios from "axios";
import { User } from "../types";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export const registerRequest = async (user: User) => instance.post(`/api/register`, user);

export const loginRequest = async (user: User) => instance.post(`/api/login`, user);

export const verifyTokenRequest = async () => instance.get(`/api/verify`);

export const getNotifRequest = async (usuario: User) => instance.post(`/api/notificaciones`, usuario);

export const getForo = async (usuario: User) => instance.post(`/api/notificaciones2`, usuario);

export const getForoCom = async (usuario: User) => instance.get(`/api/notificaciones3/id: ${usuario.id}`);
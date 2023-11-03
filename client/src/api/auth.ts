import axios from "axios";
import { User } from "../types";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export const registerRequest = async (user: User) =>
  instance.post(`/api/register`, user);

export const loginRequest = async (user: User) => instance.post(`/api/login`, user);

export const verifyTokenRequest = async () => instance.get(`/api/verify`);

export const getNotifRequest = async (usuario: JSON) => instance.post(`/api/notificaciones`, usuario);
import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:4000",
	withCredentials: true,
});

export const registerRequest = async (user) =>
	instance.post(`/api/register`, user);
export const loginRequest = async (user) => instance.post(`/api/login`, user);
export const verifyTokenRequest = async () => instance.get(`/api/verify`);

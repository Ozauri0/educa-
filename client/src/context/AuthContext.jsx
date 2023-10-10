import React, { useState, createContext, useContext, useEffect } from "react";
import { loginRequest } from "../api/auth";
import { verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	const signin = async (user) => {
		try {
			const res = await loginRequest(user);
			console.log("Signin response:", res);
			setCurrentUser(res.data);
			setIsAuthenticated(true);
		} catch (error) {
			console.log(error);
		}
	};

	const logout = () => {
		Cookies.remove("token");
		setCurrentUser(null);
		setIsAuthenticated(false);
	};

	useEffect(() => {
		const checkLogin = async () => {
			const cookies = Cookies.get();

			if (!cookies.token) {
				setIsAuthenticated(false);
				setLoading(false);
				return setCurrentUser(null);
			}

			try {
				const res = await verifyTokenRequest(cookies.token);
				console.log(res);
				if (!res.data) return setIsAuthenticated(false);
				setIsAuthenticated(true);
				setCurrentUser(res.data);
				setLoading(false);
			} catch (error) {
				setIsAuthenticated(false);
				setLoading(false);
			}
		};
		checkLogin();
	}, []);

	return (
		<AuthContext.Provider
			value={{ currentUser, isAuthenticated, signin, logout, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;

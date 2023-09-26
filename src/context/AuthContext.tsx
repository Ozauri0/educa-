import React, { useState, createContext, useContext, ReactNode } from "react";
import { registerRequest } from "../api/auth";
import { LoggedInUser } from "../schemas/AuthSchema";

interface AuthContextProps {
	signup: (user: object) => void;
	currentUser: LoggedInUser | null;
	isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth: any = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	const signup = async (user: object) => {
		try {
			const res = await registerRequest(user);
			console.log("RES:", res);
			setCurrentUser(res.data);
			setIsAuthenticated(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				signup,
				currentUser,
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

import React, {
	useState,
	createContext,
	useContext,
	useEffect,
	ReactNode,
} from "react";
<<<<<<< HEAD
import { loginRequest } from "../api/auth";
=======
import { loginRequest, registerRequest } from "../api/auth";
>>>>>>> Main
import { verifyTokenRequest } from "../api/auth";
import { User, AuthContextType } from "../types";
import Cookies from "js-cookie";

interface AuthProviderProps {
	children: ReactNode;
}

<<<<<<< HEAD
export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);
=======
export const AuthContext = createContext<AuthContextType | null>(null);
>>>>>>> Main

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const signin = async (user: User) => {
		try {
<<<<<<< HEAD
			const res = await loginRequest(user);
			setCurrentUser(res.data);
			setIsAuthenticated(true);
		} catch (error) {
			console.log(error);
		}
	};

=======
			const response = await loginRequest(user);
			setCurrentUser(response.data);
			setIsAuthenticated(true);
			return true
		} catch (error: any) {
			if (error.response && error.response.data) {
				throw new Error(error.response.data.error); // Relanzar el error específico del backend
			} else {
				throw new Error("Error al iniciar sesión");
			}
		}
	};

	const signup = async (user: User) => {
		try {
			const response = await registerRequest(user);
			if (response.status === 201) {
				return response
			}
		} catch (error: any) {
			if (error.response && error.response.data) {
				throw new Error(error.response.data.error); // Relanzar el error específico del backend
			} else {
				throw new Error("Error al crear la cuenta");
			}
		}
	}

>>>>>>> Main
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
				const res = await verifyTokenRequest();
				console.log("Respuesta de verifyTokenRequest:", res);
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
<<<<<<< HEAD
			value={{ currentUser, isAuthenticated, signin, logout, loading }}
=======
			value={{ currentUser, isAuthenticated, signin, signup, logout, loading }}
>>>>>>> Main
		>
			{children}
		</AuthContext.Provider>
	);
};

/* eslint-disable react/prop-types */
import { useAuth } from "./context/AuthContext";
import { Redirect } from "react-router-dom";
import React, { ReactNode } from "react";
import { useHistory } from "react-router-dom";

interface ProtectedRouteProps {
	children: ReactNode;
}

interface ProtectedLoginProps {
	children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { loading, isAuthenticated } = useAuth();
	if (loading) {
		return <h2>Loading...</h2>;
	}
	if (!loading && !isAuthenticated) {
		return <Redirect to={{ pathname: "/Login", state: { replace: true } }} />;
	}
	return <>{children}</>;
}

export function ProtectedLogin({ children }: ProtectedLoginProps) {
	const { loading, isAuthenticated } = useAuth();
	if (loading) {
		return <h2>Loading...</h2>;
	}
	if (!loading && !isAuthenticated) {
		return <>{children}</>;
	}
	return <Redirect to={{ pathname: "/Inicio", state: { replace: true } }} />;
}

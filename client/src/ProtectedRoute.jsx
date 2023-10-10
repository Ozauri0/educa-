import { useAuth } from "./context/AuthContext";
import { Redirect } from "react-router-dom";
import React from "react";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
	const { loading, isAuthenticated } = useAuth();
	if (loading) {
		return <h2>Loading...</h2>;
	}
	if (!loading && !isAuthenticated) {
		return <Redirect to="/Login" replace />;
	}
	return children;
}

export default ProtectedRoute;

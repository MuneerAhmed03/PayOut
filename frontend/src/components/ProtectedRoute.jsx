import { useState, useEffect } from "react";
import { Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { checkAuth } from "../utils/auth";
import { Spinner } from "./Spinner";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const authStatus = async () => {
      const response = await checkAuth();
      setIsAuthenticated(response);
    };
    authStatus();
  }, []);;
  if (isAuthenticated === null) {
    return <Spinner/>; // Or a loading spinner
  }

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace={true} />
  );
};

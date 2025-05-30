import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoutes() {
  const user = useAuth(); // Access user from context
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;

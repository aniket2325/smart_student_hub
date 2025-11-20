import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but wrong role, redirect to their correct dashboard
  if (userRole !== allowedRole) {
    return <Navigate to={`/dashboard/${userRole}`} replace />;
  }

  // If authenticated and correct role, render the component
  return children;
}
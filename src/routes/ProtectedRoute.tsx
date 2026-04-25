import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../store/auth";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  console.log("AUTH CHECK:", isAuthenticated());
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

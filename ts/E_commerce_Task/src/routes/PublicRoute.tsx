import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function PublicRoute({ children }: Props) {
  const { user } = useAuth(); // ✅ from context

  // if already logged in → redirect
  if (user) {
    return <Navigate to="/carts" />;
  }

  return <>{children}</>;
}

export default PublicRoute;
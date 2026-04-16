import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const { user } = useAuth(); // ✅ get from context
  // console.log(user)

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
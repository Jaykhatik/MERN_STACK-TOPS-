import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import ls from "../utils/secureStorage";

// define the shape of the context
interface AuthContextType {
  user: any; // keep as any since you didn't specify a user type
  login: (userData: any) => void;
  logout: () => void;
}

// define props for provider
interface AuthProviderProps {
  children: ReactNode;
}

// create context with type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);

  // load user on refresh
  useEffect(() => {
    const storedUser = ls.get("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

   // login
  const login = (userData: any) => {
    setUser(userData);
    ls.set("user", userData);
  };

  // logout
  const logout = () => {
    setUser(null);
    ls.remove("user");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
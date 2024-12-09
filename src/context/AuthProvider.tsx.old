import React, { createContext, useState, useEffect, useContext } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("checking token");

    const token = localStorage.getItem("jwtToken");
    console.log("token", token);
    console.log("isAuthenticated", !!token);

    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("jwtToken", token);
    console.log("login", token);

    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log("logout");

    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

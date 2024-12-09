import { useContext, createContext, useState } from "react";

const serveurUrl = "https://ethan-server.com:8443";

interface AuthContextType {
  token: string;
  loginAction: (usermail: string, password: string) => Promise<boolean | string>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");
  const loginAction = async (usermail: string, password: string) => {
    try {
      const response = await fetch(serveurUrl + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usermail, password }),
      });
      const res = await response.json();
      if (res.jwt) {
        setToken(res.jwt);
        localStorage.setItem("jwtToken", res.jwt);
        return res.location;
      }
      return false;
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logOut = () => {
    setToken("");
    localStorage.removeItem("jwtToken");
  };

  return (
    <AuthContext.Provider value={{ token, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

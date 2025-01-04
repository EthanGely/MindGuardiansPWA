import { useContext, createContext, useState, ReactNode, useEffect } from "react";

const serveurUrl = "https://ethan-server.com:8443";

interface AuthContextType {
  token: string;
  loginAction: (usermail: string, password: string) => Promise<boolean | string>;
  logOut: () => void;
  signIn: (userData: {}) => Promise<boolean | string>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("jwtToken");
      if (token && token !== undefined && token !== "undefined" && token !== "") {
        fetch(serveurUrl + "/auth/checkToken", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(async (response) => {
          const data = await response.json();
          if (response.status === 200 && data.jwt && data.location) {
            setToken(data.jwt);
            localStorage.setItem("jwtToken", data.jwt);
            console.log("Token is valid");
            if (!window.location.href.includes(data.location)) {
              window.location.href = data.location;
            }
          } else {
            localStorage.removeItem("jwtToken");
          }
        });
      } else {
        console.log("No token found");
      }
    };

    checkTokenValidity();
  }, []);

  const loginAction = async (usermail: string, password: string) => {
    const response = await fetch(serveurUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usermail, password }),
    });
    const res = await response.json();
    if (res.jwt) {
      console.log("token :", res.jwt);
      setToken(res.jwt);
      localStorage.setItem("jwtToken", res.jwt);
      return res.location;
    } else {
      console.log("no token");
    }
    return false;
  };

  const signIn = async (userData: {}) => {
    const response = await fetch(serveurUrl + "/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const res = await response.json();
    console.log(res);

    if (response.status === 200 && res.jwt && res.location) {
      setToken(res.jwt);
      localStorage.setItem("jwtToken", res.jwt);
      return res.location;
    } else {
      console.log("no token");
    }
    return false;
  };

  const logOut = () => {
    setToken("");
    localStorage.removeItem("jwtToken");
  };

  return <AuthContext.Provider value={{ token, loginAction, logOut, signIn }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

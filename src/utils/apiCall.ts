import { useState, useCallback } from "react";

const serveurUrl = "https://ethan-server.com:8443";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = useCallback(async (endpoint: string, data: any = null, method = "POST") => {
    const token = localStorage.getItem("jwtToken");
    if (token && token != undefined) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(serveurUrl + endpoint, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer: " + token,
          },
          body: JSON.stringify(data ? data : {}),
        });

        const responseData = await response.json();
        if (responseData.jwt && responseData.jwt != undefined) {
          localStorage.setItem("jwtToken", responseData.jwt);
          return responseData;
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      setError("No token in localStorage");
      setLoading(false);
    }
  }, []);

  return { callApi, loading, error };
};

export const login = async (usermail: string, password: string) => {
  const { callApi } = useApi();
  const response = await callApi("/auth/login", { usermail, password });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  const responseJson = await response.json();
  localStorage.setItem("jwtToken", responseJson.jwt);
  return responseJson.location;
};

export const signUp = async (usermail: string, password: string) => {
  const { callApi } = useApi();
  const response = await callApi("/auth/login", { usermail, password });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  const responseJson = await response.json();
  localStorage.setItem("jwtToken", responseJson.jwt);
  return responseJson.location;
};

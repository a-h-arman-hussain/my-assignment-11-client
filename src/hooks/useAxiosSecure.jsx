import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    // Request Interceptor → add JWT Token to headers
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor → if 401 or 403 → logout
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logOut();
        }
        return Promise.reject(error);
      }
    );
  }, [logOut]);

  return axiosSecure;
};

export default useAxiosSecure;

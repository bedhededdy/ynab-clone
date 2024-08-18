import { createContext, useContext } from "react";
import axios, { AxiosInstance } from "axios";

interface IHTTPContext {
  http: AxiosInstance;
}

const instance = axios.create()
instance.interceptors.request.use(config => {
  config.baseURL = "http://localhost:8080";
  return config;
}, error => {
  return Promise.reject(error);
});

export const HTTPContext = createContext<IHTTPContext>({http: instance});
export const useHTTPContext = () => {
  const context = useContext(HTTPContext);
  if (!context)
    throw new Error("useHTTPContext is not initialized");
  return context.http;
}

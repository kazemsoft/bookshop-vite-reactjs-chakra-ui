import appStore from "@stores/appStore";
import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import config from "src/config";

const { API_URI: baseURL, PUBLIC_URL } = config;
const restAPI = axios.create({ baseURL });

restAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = appStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

restAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 &&
      !originalRequest.url.includes("/auth/login")
    ) {
      appStore.getState().logout();
      window.location.href = PUBLIC_URL;
    } else {
      return Promise.reject(error);
    }
  }
);

export default restAPI;

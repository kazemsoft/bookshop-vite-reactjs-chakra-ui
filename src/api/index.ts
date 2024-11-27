import appStore from "@stores/appStore";
import axios, { InternalAxiosRequestConfig } from "axios";
import saloonRefreshRestClient from "axios";
import config from "src/config";

const restAPI = axios.create();
const { IAM_URL, PUBLIC_URL } = config;

restAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const id_token = appStore.getState().idToken;
  !!id_token && (config.headers.Authorization = `Bearer ${id_token}`);
  return config;
});

restAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error?.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      const refresh_token = appStore.getState().refreshToken;

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const obj: any = {
          client_id: "k3s",
          grant_type: "refresh_token",
          refresh_token,
        };
        const { data } = await saloonRefreshRestClient.post(
          `${IAM_URL}/oidc/token`,
          Object.keys(obj)
            .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
            .join("&"),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        appStore.setState((state) => {
          state.accessToken = data.access_token;
          state.refreshToken = data.refresh_token;
          state.idToken = data.id_token;
        });
        originalConfig.headers["Authorization"] = `Bearer ${data.id_token}`;

        return restAPI(originalConfig);
      } catch (e) {
        appStore.getState().logout();
        window.location.href = PUBLIC_URL;
      }
    } else {
      return Promise.reject(error);
    }
  }
);

const iamRestAPI = axios.create();

iamRestAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const access_token = appStore.getState().accessToken;
  !!access_token && (config.headers.Authorization = `Bearer ${access_token}`);
  config.baseURL = `${IAM_URL}`;
  config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  return config;
});

iamRestAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error?.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      const refresh_token = appStore.getState().refreshToken;

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const obj: any = {
          client_id: "k3s",
          grant_type: "refresh_token",
          refresh_token,
        };
        const { data } = await saloonRefreshRestClient.post(
          `${IAM_URL}/oidc/token`,
          Object.keys(obj)
            .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
            .join("&"),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        appStore.setState((state) => {
          state.accessToken = data.access_token;
          state.refreshToken = data.refresh_token;
          state.idToken = data.id_token;
        });
        originalConfig.headers["Authorization"] = `Bearer ${data.access_token}`;

        return iamRestAPI(originalConfig);
      } catch (e) {
        appStore.getState().logout();
        window.location.href = PUBLIC_URL;
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export { restAPI, iamRestAPI };

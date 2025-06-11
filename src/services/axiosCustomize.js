import axios from "axios";
import nProgress from "nprogress";

nProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    nProgress.start();
    if (
      typeof window !== "undefined" &&
      window &&
      window.localStorage &&
      window.localStorage.getItem("access_token")
    ) {
      config.headers.Authorization = `Bearer ${window.localStorage.getItem("access_token")}`;
    }
    return config;
  },
  (error) => {
    nProgress.done();
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    nProgress.done();
    if (response?.data?.data) return response.data;
    return response;
  },
  (error) => {
    nProgress.done();
    if (error?.response?.data) return error.response.data;
    return Promise.reject(error);
  },
);

export default instance;

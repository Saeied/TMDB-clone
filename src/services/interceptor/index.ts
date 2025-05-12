import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${process.env.TOKEN}`;
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
import axios from "axios";

const instance = axios.create({
  baseURL: "https://4353a42988da.ngrok.io",
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;

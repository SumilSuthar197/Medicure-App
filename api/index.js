import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://medicure-sumilsuthar197.koyeb.app/",
  headers: {
    "Content-Type": "application/json",
    "X-Platform": "app",
  },
});

export default axiosInstance;

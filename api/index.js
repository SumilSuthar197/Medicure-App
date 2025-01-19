import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storedItem = AsyncStorage.getItem("userInfo");

const axiosInstance = axios.create({
  baseURL: "https://medicsumilsuthar197.koyeb.app/",
  headers: {
    "Content-Type": "application/json",
    "X-Platform": "app",
  },
});

export { axiosInstance };

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

// const axiosInstanceWithToken = async () => {
//   const storedItem = await AsyncStorage.getItem("userInfo");
//   const jwtToken = JSON.parse(storedItem);

//   return axios.create({
//     baseURL: "https://localhost:5000/",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Platform": "app",
//       Authorization: `Bearer ${jwtToken}`,
//     },
//   });
// };

export { axiosInstance };

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { createContext, useEffect, useState } from "react";
const BASE_URL = "https://medicure-avi420-69.koyeb.app/";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (name, email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch((e) => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = async (email, password) => {
    setIsLoading(true);
    let { data } = await axios.post(`${BASE_URL}/login`, {
      user: "PATIENT",
      email: email,
      password: password,
    });

    if (data.output === true) {
      let userInfo = data.token;
      console.log(data);
      setUserInfo(data.token);
        AsyncStorage.setItem("userInfo", JSON.stringify(data.token));
        setIsLoading(false);
        //   sessionStorage.setItem("token", data.token);
        router.push("/Patient/menu");
      //navigate
    } else alert(data.output);
    // axios
    //   .post(`${BASE_URL}/login`, {
    //     email,
    //     password,
    //   })
    //   .then((res) => {
    //     let userInfo = res.data;
    //     console.log(userInfo);
    //     setUserInfo(userInfo);
    //     AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    //     setIsLoading(false);
    //   })
    //   .catch((e) => {
    //     console.log(`login error ${e}`);
    //     setIsLoading(false);
    //   });
  };

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.access_token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        AsyncStorage.removeItem("userInfo");
        setUserInfo({});
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
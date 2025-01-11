import React, { useEffect } from "react";
import { Image, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { medicureSplashScreenImage } from "../constants/data";

const HomePage = () => {
  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        const userToken = await AsyncStorage.getItem("userToken");
        const userType = await AsyncStorage.getItem("userType");

        if (!userToken || !userType) {
          router.replace("/onboarding");
        } else if (userType === "DOCTOR") {
          router.replace("/Doctor/Home");
        } else {
          router.replace("/Patient/Home");
        }
      } catch (error) {
        console.error("Error retrieving userInfo:", error);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    checkUserInfo();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#4942E4" }}>
        <StatusBar
          backgroundColor="#4942E4"
          translucent={false}
          style="light"
        />
        <Image
          source={{ uri: medicureSplashScreenImage }}
          resizeMode="contain"
          style={{ flex: 1, width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
};

export default HomePage;

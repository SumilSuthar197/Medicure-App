import React, { useEffect } from "react";
import { router } from "expo-router";
import { Image, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

const HomePage = () => {
  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        await SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding

        const userInfoString = await AsyncStorage.getItem("userInfo");
        const doctorInfoString = await AsyncStorage.getItem("doctorInfo");

        if (userInfoString) {
          router.replace("/Patient/menu");
        } else if (doctorInfoString) {
          router.replace("/Doctor/Doctormenu");
        } else {
          router.replace("/onboarding");
        }

        await SplashScreen.hideAsync(); // Hide the splash screen after navigation
      } catch (error) {
        await SplashScreen.hideAsync(); // Ensure the splash screen is hidden in case of an error
        console.error("Error retrieving userInfo:", error);
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
          source={{
            uri: "https://res.cloudinary.com/deohymauz/image/upload/v1704457322/100_Light_settings_invited_friends_2_n4lgbj.png",
          }}
          resizeMode="contain"
          style={{ flex: 1, width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
};

export default HomePage;

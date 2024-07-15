import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Image, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const HomePage = () => {
  const [isInitialized, setIsInitialized] = useState(false); // New state to track initialization

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        // Perform your checks here
        // Uncomment and use the following lines as needed
        // await SplashScreen.preventAutoHideAsync();
        // const userInfoString = await AsyncStorage.getItem("userInfo");
        // const DoctorInfoString = await AsyncStorage.getItem("doctorInfo");

        // if (userInfoString) {
        //   router.replace("/Patient/menu");
        // } else if (DoctorInfoString) {
        //   router.replace("/Doctor/Doctormenu");
        // } else {
        //   setIsInitialized(true); // Set initialization complete
        // }
        setIsInitialized(true); // For demonstration, mark as initialized immediately
        // await SplashScreen.hideAsync();
      } catch (error) {
        await SplashScreen.hideAsync();
        console.error("Error retrieving userInfo:", error);
      }
    };
    checkUserInfo();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      // Perform navigation only after initialization is complete
      router.replace("/onboarding");
    }
  }, [isInitialized]); // This effect depends on the `isInitialized` state

  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          backgroundColor: "#4942E4",
        }}
      >
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
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default HomePage;

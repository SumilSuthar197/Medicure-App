import React, { useContext, useEffect } from "react";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Notifications from "expo-notifications";
// import { sendNotification } from "../context/NotificationSystem";

const HomePage = () => {
  // const { userInfo, isLoading, logout } = useContext(AuthContext);
  useEffect(() => {
    // const gettingNotification = async () => {
    //   const { status } = await Notifications.requestPermissionsAsync();
    //   if (status !== "granted") {
    //     alert("Permission to receive push notifications denied!");
    //     return;
    //   }
    //   // sendNotification();
    // };
    const checkUserInfo = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem("userInfo");
        const DoctorInfoString = await AsyncStorage.getItem("doctorInfo");

        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          console.log(userInfo);
          router.push("/Patient/menu");
        } else if (DoctorInfoString) {
          const userInfo = JSON.parse(DoctorInfoString);
          console.log(userInfo);
          router.push("/Doctor/Doctormenu");
        } else {
          router.push("/onboarding");
        }
      } catch (error) {
        console.error("Error retrieving userInfo:", error);
      }
    };

    const timer = setTimeout(() => {
      // gettingNotification();
      checkUserInfo();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={styles.logoimage}
          source={require("../assets/images/logo-light.png")}
        />
        <Text style={styles.logotext}>MediCure</Text>
      </View>
      <Text style={{}}>Logo Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4942E4",
    alignItems: "center",
    justifyContent: "space-evenly",
    fontSize: "20px",
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  logoimage: {
    width: 50,
    objectFit: "contain",
  },
  logotext: {
    color: "#FFF",
    fontFamily: "Poppins-Regular",
    fontSize: 34,
    paddingLeft: 10,
  },
});

export default HomePage;

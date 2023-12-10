import React, { useContext, useEffect } from "react";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomePage = () => {
  // const { userInfo, isLoading, logout } = useContext(AuthContext);
  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem("userInfo");

        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          console.log(userInfo);
          router.push("/Patient/menu");
        } else {
          router.push("/onboarding");
        }
      } catch (error) {
        console.error("Error retrieving userInfo:", error);
        // Handle error as needed
      }
    };

    const timer = setTimeout(checkUserInfo, 2000);
    // Cleanup function
    return () => clearTimeout(timer);
  }, []);
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={styles.logoimage}
          source={require("../assets/images/logo-light.png")}
        />
        <Text style={styles.logotext}>MediCure</Text>
      </View>
      <Text style={{}}>Logo Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#246BFD",
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

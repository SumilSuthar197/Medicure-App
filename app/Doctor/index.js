import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/PrimaryButton";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Location from "expo-location";

const index = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleLogin = async (e) => {
    e.preventDefault();
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission was denied",
          "Please allow location access to use this feature"
        );
        return null;
      }
      try {
        const userLocation = await Location.getCurrentPositionAsync({});
        return {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        };
      } catch (error) {
        Alert.alert("Error", "An error occurred while fetching location.");
        return null;
      }
    };
    const login = async (location) => {
      try {
        if (email === null || password === null) {
          Alert.alert("Missing Information", "Please fill all the fields");
          return;
        }
        const { data } = await axios.post(
          `https://medicure-sumilsuthar197.koyeb.app/login`,
          {
            user: "DOCTOR",
            email: email.toLowerCase(),
            password: password,
            location: location,
          }
        );
        if (data.output === true) {
          AsyncStorage.setItem("doctorInfo", JSON.stringify(data.token));
          AsyncStorage.setItem(
            "doctorEmail",
            JSON.stringify(email.toLowerCase())
          );
          router.replace("/Doctor/Doctormenu");
        } else {
          Alert.alert(
            "Login Failed",
            "Please check your credentials and try again."
          );
        }
      } catch (error) {
        console.error("Error during login:", error);
        Alert.alert(
          "Error",
          "An error occurred during login. Please try again later."
        );
      }
    };
    const userLocation = await fetchLocation();
    if (userLocation) {
      await login(userLocation);
    }
  };
  const ResetPasswordAlert = () => {
    Alert.alert(
      "Reset Password",
      "A reset password link has been sent to your email address."
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.itemTitle}>Sign In</Text>
        <Text style={styles.itemText}>
          Hi! Welcome Back, you've been missed
        </Text>
      </View>
      <View style={styles.form}>
        <View>
          <Text style={styles.textTitle}>Email</Text>
          <TextInput
            keyboardType="email-address"
            placeholder="Your Email"
            style={styles.textContainer}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Password</Text>
          <TextInput
            placeholder="Your Password"
            secureTextEntry={true}
            style={styles.textContainer}
            onChangeText={(text) => setPassword(text)}
          />
          <Text style={styles.forgetPassword} onPress={ResetPasswordAlert}>
            Forgot Password
          </Text>
        </View>
        <PrimaryButton
          backgroundColor="#000"
          color="#FFF"
          label="Sign In"
          onPress={handleLogin}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  itemTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10,
    color: "black",
    paddingHorizontal: 15,
  },
  itemText: {
    textAlign: "center",
    marginHorizontal: 35,
    color: "black",
    lineHeight: 22,
    fontSize: 14,
    paddingHorizontal: 15,
  },
  form: {
    flex: 2,
    paddingHorizontal: 15,
    rowGap: 25,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginLeft: 3,
  },
  textContainer: {
    fontSize: 14,
    fontWeight: "500",
    paddingLeft: 12,
    paddingRight: 12,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F5F7F8",
    width: "100%",
    marginHorizontal: "auto",
  },
  forgetPassword: {
    color: "blue",
    textDecorationStyle: "dotted",
    backgroundColor: "#FFF",
    textAlign: "right",
    paddingHorizontal: 7,
    fontSize: 14,
    paddingVertical: 5,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
});

export default index;

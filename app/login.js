import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import PrimaryButton from "../components/PrimaryButton";
import { userForgetPassword, userLogin } from "../api/common";

const Login = () => {
  const { userType } = useLocalSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Alert.alert("Missing Information", "Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      let location = null;
      if (userType === "DOCTOR") {
        location = await fetchLocation();
      }
      let { data } = await userLogin(userType, email, password, location);
      if (data.output === true) {
        await AsyncStorage.setItem("userToken", JSON.stringify(data.token));
        await AsyncStorage.setItem("userType", JSON.stringify(userType));
        await AsyncStorage.setItem("userEmail", JSON.stringify(email));
        if (userType === "DOCTOR") router.replace("./Doctor/Home");
        else router.replace("/Patient/Home");
      } else {
        Alert.alert("Login Failed", data?.output);
      }
    } catch (error) {
      console.log("login Error", error);

      Alert.alert(
        "Login Failed",
        "An error occurred during login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const ResetPasswordAlert = async () => {
    if (!email) {
      Alert.alert("Missing Information", "Please enter your email address");
      return;
    }
    try {
      await userForgetPassword(email);
      Alert.alert(
        "Reset Password Successful",
        "A reset password link has been sent to your email address."
      );
    } catch (error) {
      Alert.alert(
        "Reset Password Failed",
        "An error occurred while sending the reset password link."
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.itemView}>
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
          <Text
            style={[styles.highlightedText, styles.resetText]}
            onPress={ResetPasswordAlert}
          >
            Forgot Password
          </Text>
        </View>
        <View>
          <PrimaryButton
            backgroundColor="#000"
            color="#FFF"
            label="Sign In"
            onPress={handleSubmit}
            loading={loading}
          />
          {userType === "PATIENT" && (
            <Text style={{ textAlign: "center", paddingVertical: 15 }}>
              Don't have an account?{" "}
              <Text
                style={styles.highlightedText}
                onPress={() => router.push(`/signup?userType=${userType}`)}
              >
                Sign Up
              </Text>
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  itemView: { flex: 1, justifyContent: "center", alignItems: "center" },
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
  resetText: {
    backgroundColor: "#FFF",
    textAlign: "right",
    paddingHorizontal: 7,
    fontSize: 14,
    fontWeight: "500",
    paddingVertical: 5,
    marginBottom: 10,
  },
  highlightedText: {
    textDecorationLine: "underline",
    color: "blue",
    fontWeight: "bold",
  },
});

export default Login;

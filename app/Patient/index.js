import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
import { StatusBar } from "expo-status-bar";
import { usePatientProfile } from "../../context/PatientProfileProvider";

const index = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { setPatientProfile } = usePatientProfile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === null || password === null) {
      Alert.alert("Missing Information", "Please fill all the fields");
      return;
    }
    let { data } = await axios.post(`https://medicure-sumilsuthar197.koyeb.app/login`, {
      user: "PATIENT",
      email: email.toLowerCase(),
      password: password,
    });
    if (data.output === true) {
      AsyncStorage.setItem("userInfo", JSON.stringify(data.token));
      router.replace("/Patient/menu");
    } else alert(data?.output);
  };
  const ResetPasswordAlert = () => {
    Alert.alert(
      "Reset Password",
      "A reset password link has been sent to your email address.",
      [
        {
          text: "OK",
          onPress: () => console.log("Email Sent"),
        },
      ]
    );
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
          <Text style={styles.resetText} onPress={ResetPasswordAlert}>
            Forgot Password
          </Text>
        </View>
        <View>
          <PrimaryButton
            backgroundColor="#000"
            color="#FFF"
            label="Sign In"
            onPress={handleSubmit}
          />
          <Text style={{ textAlign: "center", paddingVertical: 15 }}>
            Don't have an account?{" "}
            <Text
              style={{
                textDecorationLine: "underline",
                color: "blue",
                fontWeight: "bold",
              }}
              onPress={() => router.push("/Patient/Signup")}
            >
              Sign Up
            </Text>
          </Text>
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

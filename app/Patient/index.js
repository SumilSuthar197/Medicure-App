import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/PrimaryButton";
import { router } from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backendUrl } from "../../constants/URL";

const index = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { data } = await axios.post(`${backendUrl}/login`, {
      user: "PATIENT",
      email: email,
      password: password,
    });
    // console.log(data);
    if (data.output === true) {
      AsyncStorage.setItem("userInfo", JSON.stringify(data.token));
      router.push("/Patient/menu");
    } else alert(data.output);
  };
  const ResetPasswordAlert = () => {
    Alert.alert(
      "Reset Password",
      "A reset password link has been sent to your email address.",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]
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
          <Text
            style={{
              color: "blue",
              textDecorationStyle: "dotted",
              backgroundColor: "#FFF",
              textAlign: "right",
              paddingHorizontal: 7,
              fontSize: 14,
              paddingVertical: 5,
              textDecorationLine: "underline",
              marginBottom: 10,
            }}
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
    fontFamily: "Poppins-Regular",
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
});

export default index;

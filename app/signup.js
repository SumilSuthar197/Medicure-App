import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { use, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import PrimaryButton from "../components/PrimaryButton";
import { userRegister } from "../api/common";

const Signup = () => {
  const { userType } = useLocalSearchParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleSubmit = async () => {
    const { name, email, mobile, password } = user;
    if (!name || !email || !mobile || !password) {
      Alert.alert("Missing Information", "Please fill all the fields");
      return;
    }
    try {
      const { data } = await userRegister(
        userType,
        name,
        email,
        mobile,
        password
      );
      if (data.output === true && userType === "PATIENT") {
        await AsyncStorage.setItem("userToken", JSON.stringify(data.token));
        await AsyncStorage.setItem("userType", JSON.stringify(userType));
        router.push({
          pathname: "/Patient/Profile",
          params: {
            email,
            name,
            mobile,
            edit: true,
          },
        });
      } else
        Alert.alert(
          "Registration Failed",
          data?.output ||
            "An error occurred during registration. Please try again."
        );
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        "An error occurred during registration. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.itemView}>
        <Text style={styles.itemTitle}>Create Account</Text>
        <Text style={styles.itemText}>Hi! Fill your information below</Text>
      </View>
      <View style={styles.form}>
        <View>
          <Text style={styles.textTitle}>Name</Text>
          <TextInput
            placeholder="Your Full Name"
            style={styles.textContainer}
            onChangeText={(text) => setUser({ ...user, name: text })}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Email</Text>
          <TextInput
            keyboardType="email-address"
            placeholder="Your Email"
            style={styles.textContainer}
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Phone Number</Text>
          <TextInput
            keyboardType="phone-pad"
            placeholder="Your Phone Number"
            style={styles.textContainer}
            onChangeText={(text) => setUser({ ...user, mobile: text })}
            maxLength={10}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Password</Text>
          <TextInput
            placeholder="Your Password"
            secureTextEntry={true}
            onChangeText={(text) => setUser({ ...user, password: text })}
            style={styles.textContainer}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <PrimaryButton
            backgroundColor="#000"
            color="#FFF"
            label="Sign Up"
            onPress={handleSubmit}
          />
          <Text style={styles.textCenter}>
            Already have an account?{" "}
            <Text
              style={styles.highlightedText}
              onPress={() => router.push(`/login?userType=${userType}`)}
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
  form: {
    flex: 2,
    paddingHorizontal: 15,
    rowGap: 20,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
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
  textCenter: {
    textAlign: "center",
    paddingVertical: 15,
  },
  itemView: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 5,
    color: "black",
    paddingHorizontal: 15,
  },
  itemText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginHorizontal: 35,
    color: "black",
    lineHeight: 22,
    paddingHorizontal: 15,
  },
  highlightedText: {
    textDecorationLine: "underline",
    color: "blue",
    fontWeight: "bold",
  },
});

export default Signup;

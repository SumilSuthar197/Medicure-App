import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/PrimaryButton";
import { router } from "expo-router";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // let { data } = axios.post("http://localhost:5000/register", {
    //   user: "PATIENT",
    //   ...user,
    // });
    let { data } = await axios.post(
      "https://medicure-avi420-69.koyeb.app/register",
      { user: "PATIENT", ...user }
    );

    if (data.output === true) {
      router.push("/index");
    } else alert(data.output);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ flex: 0.7, justifyContent: "center", alignItems: "center" }}
      >
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
            onPress={
              handleSubmit
              // router.push({
              //   pathname: "/Patient/Profile",
              //   params: { ...user },
              // })
            }
          />
          <Text style={{ textAlign: "center", paddingVertical: 15 }}>
            Already have an account?{" "}
            <Text
              style={{
                textDecorationLine: "underline",
                color: "blue",
                fontWeight: "bold",
              }}
              onPress={() => router.push("/Patient")}
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
    // color: "#000",
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
    marginBottom: 5,
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
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 20,
  },
});

export default Signup;

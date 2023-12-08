import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PrimaryButton from "../../components/PrimaryButton";

const index = () => {
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
          <TextInput placeholder="Your Email" style={styles.textContainer} />
        </View>
        <View>
          <Text style={styles.textTitle}>Password</Text>
          <TextInput
            placeholder="Your Password"
            secureTextEntry={true}
            style={styles.textContainer}
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
            onPress={() => router.push("./Patient")}
          />
          <Text style={{ textAlign: "center", paddingVertical: 15 }}>
            Don't have an account?{" "}
            <Text
              style={{
                textDecorationLine: "underline",
                color: "blue",
                fontWeight: "bold",
              }}
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
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 20,
  },
});

export default index;

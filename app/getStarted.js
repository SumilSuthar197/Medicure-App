import {
  Image,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import PrimaryButton from "../components/PrimaryButton";
import { StatusBar } from "expo-status-bar";
import { medicureGetStartedImage } from "../constants/data";

const getStarted = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: medicureGetStartedImage }}
          style={styles.getStartedImage}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Let's Started</Text>
        <Text style={styles.textDescription}>
          Begin your journey with Medicure. Your health, our priority.{" "}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <PrimaryButton
            label="Log In As Doctor"
            onPress={() => router.push("/login?userType=DOCTOR")}
            color="#FFF"
            backgroundColor="#000"
          />
        </View>
        <View>
          <PrimaryButton
            label="Log In As Patient"
            onPress={() => router.push("/login?userType=PATIENT")}
            color="#FFF"
            backgroundColor="#000"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    Height: "100%",
    flex: 2,
    backgroundColor: "#FFF",
  },
  imageContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "90%",
    marginLeft: 5,
  },
  getStartedImage: { width: "100%", height: "100%", objectFit: "contain" },
  textContainer: { paddingHorizontal: 25, paddingBottom: 35, paddingTop: 20 },
  textTitle: { fontSize: 40, fontWeight: "800", color: "black" },
  textDescription: {
    opacity: 0.5,
    marginTop: 4,
    fontSize: 16,
    color: "black",
  },
  buttonContainer: { flex: 0.5, paddingHorizontal: 20, gap: 25 },
});

export default getStarted;

import { Image, Text, View, useWindowDimensions } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import PrimaryButton from "../components/PrimaryButton";
import { StatusBar } from "expo-status-bar";

const getStarted = () => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  useEffect(() => {
    Image.prefetch(
      "https://res.cloudinary.com/deohymauz/image/upload/v1704449205/onboard4_mkfq3d.png"
    );
  }, []);
  return (
    <SafeAreaView
      style={{
        width: SCREEN_WIDTH,
        minHeight: SCREEN_HEIGHT,
        flex: 2,
        backgroundColor: "#FFF",
      }}
    >
      <StatusBar style="auto" />
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          width: SCREEN_WIDTH * 0.9,
          marginLeft: 5,
        }}
      >
        <Image
          source={{
            uri: "https://res.cloudinary.com/deohymauz/image/upload/v1704449205/onboard4_mkfq3d.png",
          }}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </View>
      <View
        style={{ paddingHorizontal: 25, paddingBottom: 35, paddingTop: 20 }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: "800",
            color: "black",
          }}
        >
          Let's Started
        </Text>
        <Text
          style={{
            opacity: 0.5,
            marginTop: 16,
            fontSize: 16,
            color: "black",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed.
        </Text>
      </View>

      <View style={{ flex: 0.5, paddingHorizontal: 20, gap: 25 }}>
        <View>
          <PrimaryButton
            label="Log In As Doctor"
            onPress={() => router.push("./Doctor")}
            color="#FFF"
            backgroundColor="#000"
          />
        </View>
        <View>
          <PrimaryButton
            label="Log In As Patient"
            onPress={() => router.push("./Patient")}
            color="#FFF"
            backgroundColor="#000"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default getStarted;

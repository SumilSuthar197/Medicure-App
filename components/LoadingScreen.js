import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { backgroundColor, blueColor } from "../constants/color";

const LoadingScreen = ({ text }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
      }}
    >
      <ActivityIndicator size="large" color={blueColor} />
      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          fontWeight: 600,
          color: blueColor,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default LoadingScreen;

import { Text, TouchableOpacity } from "react-native";
import React from "react";
const PrimaryButton = ({
  onPress,
  label,
  color,
  backgroundColor,
  style,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: backgroundColor,
          paddingHorizontal: 32,
          height: 52,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[{ fontSize: 16, fontWeight: "600", color: color }, labelStyle]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

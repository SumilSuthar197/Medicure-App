import { View, Text, Image, Dimensions } from "react-native";
import React, { useEffect } from "react";
import PrimaryButton from "./PrimaryButton"; // Adjust the path as per your file structure
import { blueColor } from "../constants/color";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ErrorPage = ({
  errorStatus,
  height,
  width,
  textContent,
  onBtnClick,
  buttonLabel,
}) => {
  const router = useRouter();
  const imageUrl =
    "https://res.cloudinary.com/deohymauz/image/upload/v1704466600/Appointment_kdgksq.png";

  useEffect(() => {
    Image.prefetch(imageUrl);
  }, []);

  if (errorStatus === 404 || errorStatus === 500) {
    height = Dimensions.get("window").height;
    width = Dimensions.get("window").width;
    textContent =
      errorStatus === 404
        ? "Page Not Found"
        : "Something went wrong! Please try again";
    onBtnClick = () => {
      AsyncStorage.removeItem("userToken");
      AsyncStorage.removeItem("userType");
      router.replace("/getStarted");
    };
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: errorStatus ? -20 : height * 0.15,
      }}
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        style={{
          width: width * 0.8,
          height: height * 0.3,
        }}
      />
      <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 20 }}>
        {textContent}
      </Text>
      {onBtnClick && (
        <View
          style={{ flex: 1, width: "95%", position: "absolute", bottom: 15 }}
        >
          <PrimaryButton
            onPress={onBtnClick}
            label={buttonLabel || "Try Again"}
            color="#fff"
            backgroundColor={blueColor}
          />
        </View>
      )}
    </View>
  );
};

export default ErrorPage;

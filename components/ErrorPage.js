import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";

const ErrorPage = ({ height, width, textContent }) => {
  const imageUrl =
    "https://res.cloudinary.com/deohymauz/image/upload/v1704466600/Appointment_kdgksq.png";
  useEffect(() => {
    Image.prefetch(imageUrl);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * 0.1,
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
    </View>
  );
};

export default ErrorPage;

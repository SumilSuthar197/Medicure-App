import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { blueColor, whiteText } from "../../constants/color";

const BlueCard = ({
  containAppointment,
  name,
  type,
  imagePath,
  Date,
  Time,
}) => {
  return (
    <View
      style={{
        backgroundColor: blueColor,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
      }}
    >
      {containAppointment && (
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <Image
            source={{
              uri: imagePath
                ? imagePath
                : "https://res.cloudinary.com/deohymauz/image/upload/v1704545467/demoDoctor_hkhmdp.jpg",
            }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 75,
              marginRight: 10,
            }}
          ></Image>
          <View>
            <Text style={{ color: whiteText, fontSize: 18, fontWeight: "500" }}>
              {name}
            </Text>
            <Text style={{ color: whiteText, fontSize: 14, fontWeight: "400" }}>
              {type}
            </Text>
          </View>
        </View>
      )}
      <View
        style={{
          borderRadius: 15,
          backgroundColor: "#0858d1",
          flexDirection: "row",
          paddingHorizontal: 15,
          paddingVertical: 10,
          justifyContent: "space-around",
        }}
      >
        {!containAppointment && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFF", marginLeft: 5 }}>
              You don't have a appointment yet
            </Text>
          </View>
        )}
        {containAppointment && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="calendar" size={16} color="white" />
              <Text style={{ color: "#FFF", marginLeft: 5 }}>{Date}</Text>
            </View>
            <Text style={{ color: "white" }}>|</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="clockcircleo" size={14} color="white" />
              <Text style={{ color: "#FFF", marginLeft: 5 }}>{Time}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default BlueCard;

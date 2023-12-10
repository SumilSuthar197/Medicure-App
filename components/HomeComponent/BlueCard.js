import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const BlueCard = ({ name, type, imagePath, Date, Time }) => {
  return (
    <View
      style={{
        backgroundColor: "#0165fc",
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../../assets/images/user1.png")}
          style={{
            width: 45,
            height: 45,
            borderRadius: 75,
            marginRight: 10,
          }}
        ></Image>
        <View>
          <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "500" }}>
            {name}
          </Text>
          <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "400" }}>
            {type}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRadius: 15,
          backgroundColor: "#0858d1",
          flexDirection: "row",
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginTop: 15,
          justifyContent: "space-around",
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
    </View>
  );
};

export default BlueCard;
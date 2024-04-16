import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import { router } from "expo-router";

const DoctorCard = (data) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/Patient/doctorDetails",
          params: {
            email: data.email,
          },
        });
      }}
    >
      <View
        style={{
          marginVertical: 10,
          padding: 12,
          borderRadius: 15,
          backgroundColor: whiteText,
          borderWidth: 1,
          borderColor: borderColor,
        }}
      >
        <View style={{ flexDirection: "row", gap: 20 }}>
          <View>
            <Image
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: 99,
              }}
              source={{
                uri: data.image
                  ? data.image
                  : "https://res.cloudinary.com/deohymauz/image/upload/v1704545467/demoDoctor_hkhmdp.jpg",
              }}
            />
          </View>
          <View style={{ gap: 3, justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: textBlack }}>
              {data.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: lightTextColor,
              }}
            >
              {data.field}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            alignItems: "center",
            paddingTop: 10,
            paddingHorizontal: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: lightTextColor,
                fontSize: 12,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {data.rating_score} ({data.rating_count} review)
            </Text>
          </View>
          <Text style={{ color: lightTextColor }}>|</Text>
          <Text
            style={{
              color: lightTextColor,
              fontSize: 12,
              fontWeight: "500",
              textAlign: "center",
              // width:"50%"
            }}
          >
            {data.experience} years experience
          </Text>
          <Text style={{ color: lightTextColor }}>|</Text>
          <Text
            style={{
              color: lightTextColor,
              fontSize: 12,
              fontWeight: "500",
              textAlign: "center",
              // width:"33%"
            }}
          >
            {data.location || "India"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCard;

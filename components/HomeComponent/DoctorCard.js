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
  console.log(data);
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/Patient/doctorDetails",
          params: {
            email: data.email,
            rating: data.average_rating,
            count: data.review_count,
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
                objectFit: "fill",
                borderRadius: 99,
              }}
              source={
                data.image
                  ? { uri: data.image }
                  : require("../../assets/images/Image.png")
              }
              // source={require("../../assets/images/Image.png")}
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
              {data.education.field}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 10,
            paddingHorizontal: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {/* <AntDesign name="star" size={12} color="yellow" /> */}
            <Text
              style={{
                color: lightTextColor,
                fontSize: 12,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {data.average_rating} ({data.review_count} review)
            </Text>
          </View>
          <Text style={{ color: lightTextColor }}>|</Text>
          <Text
            style={{
              color: lightTextColor,
              fontSize: 12,
              fontWeight: "500",
              textAlign: "center",
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
            }}
          >
            {data?.hospital[0]?.location ? data.hospital[0].location : "Mysuru"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCard;

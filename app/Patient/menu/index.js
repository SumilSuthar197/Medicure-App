import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/HomeComponent/Header";
import BlueCard from "../../../components/HomeComponent/BlueCard";

import { iconItem } from "../../../constants/data";
import { router } from "expo-router";
import {
  backgroundColor,
  blueColor,
  borderColor,
  lightBlueColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../../constants/color";

const index = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        padding: 20,
        flex: 1,
        backgroundColor: backgroundColor,
        paddingTop: 50,
      }}
    >
      <Header />
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginVertical: 15,
        }}
      >
        <Text style={{ color: textBlack, fontSize: 18, fontWeight: "600" }}>
          Upcomming Appointments
        </Text>
        <TouchableOpacity>
          <Text style={{ color: blueColor }}>See All</Text>
        </TouchableOpacity>
      </View>
      <BlueCard
        containAppointment={true}
        name="Dr Shashank Gupta"
        imagePath="../../assets/images/user1.png"
        type="Dentist Consultation"
        Date="Monday, 26 July"
        Time="09:00 - 10:00"
      />
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginVertical: 15,
        }}
      >
        <Text style={{ color: textBlack, fontSize: 18, fontWeight: "600" }}>
          Doctor Speciality
        </Text>
        <TouchableOpacity>
          <Text style={{ color: blueColor }}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {iconItem.map((item, index) => (
          <View
            key={index}
            style={{ width: "25%", alignItems: "center", marginBottom: 10 }}
          >
            <View
              style={{
                backgroundColor: "#dbeafe", //dbeafe
                padding: 15,
                borderRadius: 15,
              }}
            >
              {item.icon}
            </View>
            <Text style={{ fontSize: 12, fontWeight: "500", marginTop: 4 }}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginVertical: 15,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600", color: textBlack }}>
          Top Specialist
        </Text>
        <TouchableOpacity>
          <Text style={{ color: blueColor }}>See All</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{
            borderRadius: 15,
            overflow: "hidden",
            flexDirection: "column",
            width: 140,
            backgroundColor: lightBlueColor,
            borderWidth: 1,
            borderColor: borderColor,
          }}
        >
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <Image
              style={{
                width: 110,
                height: 100,
                objectFit: "fill",
              }}
              source={require("../../../assets/images/Image73.png")}
            />
          </View>
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 15,
              paddingVertical: 8,
              paddingHorizontal: 5,
              gap: 3,
            }}
          >
            <Text
              style={{ fontSize: 14, fontWeight: "600", textAlign: "center" }}
            >
              Dr. Ajay Maurya
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                textAlign: "center",
                color: "#777777",
              }}
            >
              Dentist
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  borderRadius: 15,
                  borderColor: "yellow",
                  backgroundColor: borderColor,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                5.0
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.push("/Patient/doctorDetails");
        }}
      >
        <View
          style={{
            marginTop: 20,
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
                source={require("../../../assets/images/Image.png")}
              />
            </View>
            <View style={{ gap: 3, justifyContent: "center" }}>
              <Text
                style={{ fontSize: 16, fontWeight: "600", color: textBlack }}
              >
                Dr Sarthak Tanpure
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: lightTextColor,
                }}
              >
                Dentist
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 8,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {/* <AntDesign name="star" size={12} color="yellow" /> */}
              <Text
                style={{
                  color: lightTextColor,
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                4.7 (573 review)
              </Text>
            </View>
            <Text style={{ color: lightBlueColor }}>|</Text>
            <Text
              style={{
                color: lightTextColor,
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              21 years experience
            </Text>
            <Text style={{ color: lightBlueColor }}>|</Text>
            <Text
              style={{
                color: lightTextColor,
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              100 patients
            </Text>
          </View>
          {/* <TouchableOpacity
            style={{
              backgroundColor: "#dbeafe",
              paddingHorizontal: 32,
              height: 45,
              borderRadius: 15,
              marginTop: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              router.push("/Patient/doctorDetails");
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500", color: "#246BFD" }}>
              Make Appointment
            </Text>
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#e5e5e5",
          padding: 12,
          borderRadius: 15,
          marginVertical: 20,
        }}
      >
        <View style={{ flexDirection: "row", gap: 20 }}>
          <View style={{ borderRadius: 15 }}>
            <Image
              style={{
                width: 110,
                height: 130,
                objectFit: "fill",
                borderRadius: 15,
              }}
              source={require("../../../assets/images/user1.png")}
            />
          </View>
          <View>
            <Text>Dr Sarthak Tanpure</Text>
            <Text>Dentist</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default index;

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/HomeComponent/Header";
import BlueCard from "../../../components/HomeComponent/BlueCard";
import { FontAwesome } from "@expo/vector-icons";

import { iconItem } from "../../../constants/data";
import { router } from "expo-router";

const index = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#FFF", flex: 1 }}>
      <ScrollView style={{ padding: 20, backgroundColor: "#FFF" }}>
        <Header />
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Upcomming Schedule
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "#246BFD" }}>See All</Text>
          </TouchableOpacity>
        </View>
        <BlueCard
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
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Doctor Speciality
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "#246BFD" }}>See All</Text>
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
                  backgroundColor: "#dbeafe",
                  padding: 15,
                  borderRadius: 99,
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
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Top Specialist
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "#246BFD" }}>See All</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 12,
            borderRadius: 15,
            // backgroundColor: "F5F7F8",
            borderWidth: 1,
            borderColor: "#e5e5e5",
          }}
        >
          <View style={{ flexDirection: "row", gap: 20 }}>
            <View style={{ borderRadius: 15 }}>
              <Image
                style={{
                  width: 100,
                  height: 110,
                  objectFit: "fill",
                  borderRadius: 15,
                }}
                source={require("../../../assets/images/Image.png")}
              />
            </View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                Dr Sarthak Tanpure
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>Dentist</Text>
            </View>
          </View>
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
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
    </SafeAreaView>
  );
};

export default index;

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/HomeComponent/Header";
import BlueCard from "../../../components/HomeComponent/BlueCard";

import { iconItem, topDoctor } from "../../../constants/data";
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
import DoctorCard from "../../../components/HomeComponent/DoctorCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { backendUrl } from "../../../constants/URL";

const index = () => {
  const [getUpcomingData, setUpcomingData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItem = await AsyncStorage.getItem("userInfo");
        const jwtToken = JSON.parse(storedItem);
        const response = await axios.get(
          `${backendUrl}/getpatientappointments/Upcoming`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (response.data.length !== 0) {
          setUpcomingData({ ...response.data[0] });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
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
        <TouchableOpacity onPress={() => router.push("/Patient/menu/booking")}>
          <Text style={{ color: blueColor }}>See All</Text>
        </TouchableOpacity>
      </View>
      <BlueCard
        containAppointment={
          Object.keys(getUpcomingData).length === 0 ? false : true
        }
        name={getUpcomingData.name}
        imagePath={getUpcomingData.image}
        type={getUpcomingData.field}
        Date={getUpcomingData.date}
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
                backgroundColor: blueColor, //"#dbeafe", //dbeafe
                padding: 15,
                borderRadius: 15,
              }}
            >
              <Image
                source={{ uri: item.icon }}
                style={{
                  width: 30,
                  height: 30,
                  overlayColor: "#dbeafe",
                  tintColor: "#dbeafe",
                }}
              />
              {/* {item.icon} */}
            </View>
            <Text style={{ fontSize: 12, fontWeight: "500", marginTop: 4 }}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: blueColor,
            width: "50%",
            paddingHorizontal: 0,
            borderRadius: 10,
            paddingVertical: 5,
          }}
          onPress={() => {
            router.push("/Patient/HospitalSearch");
          }}
        >
          <Text style={{ color: "#FFF", textAlign: "center" }}>
            + Search By Hospital
          </Text>
        </TouchableOpacity>
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
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/Patient/DoctorSearch",
              params: { containCategory: "" },
            })
          }
        >
          <Text style={{ color: blueColor }}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 70 }}>
        {topDoctor.map((doctor, index) => (
          <DoctorCard key={index} {...doctor} />
        ))}
      </View>
    </ScrollView>
  );
};

export default index;

import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/HomeComponent/Header";
import BlueCard from "../../../components/HomeComponent/BlueCard";
import { iconItem } from "../../../constants/data";
import { router } from "expo-router";
import {
  backgroundColor,
  blueColor,
  textBlack,
} from "../../../constants/color";
import DoctorCard from "../../../components/HomeComponent/DoctorCard";
import { StatusBar } from "expo-status-bar";
import { usePatientProfile } from "../../../context/PatientProfileProvider";
 
import axios from "axios";

const index = () => {
  const { patientProfile } = usePatientProfile();
  const [upcomingData, setUpcomingData] = useState([]);
  const [topDoctor, setTopDoctor] = useState([]);
  useEffect(() => {
    if (patientProfile?.upcoming_appointments) {
      setUpcomingData(patientProfile.upcoming_appointments);
    }
  }, [patientProfile]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://medicure-sumilsuthar197.koyeb.app/gettopdoctors`);
        setTopDoctor(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingTop: 7,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: backgroundColor,
      }}
    >
      <StatusBar
        translucent={false}
        style="dark"
        backgroundColor={backgroundColor}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: 15,
          }}
        >
          <Text style={{ color: textBlack, fontSize: 18, fontWeight: "600" }}>
            Upcoming Appointments
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/Patient/menu/booking")}
          >
            <Text style={{ color: blueColor }}>See All</Text>
          </TouchableOpacity>
        </View>
        <BlueCard
          containAppointment={
            upcomingData && upcomingData.length === 0 ? false : true
          }
          name={upcomingData[0]?.doctor_name}
          imagePath={upcomingData[0]?.image}
          type={upcomingData[0]?.doctor_email}
          Date={upcomingData[0]?.date}
          Time={upcomingData[0]?.slot}
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
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {iconItem.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{ width: "25%", alignItems: "center", marginBottom: 10 }}
              onPress={() =>
                router.push({
                  pathname: "/Patient/DoctorSearch",
                  params: { containCategory: item.name },
                })
              }
            >
              <View
                style={{
                  backgroundColor: blueColor,
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
              </View>
              <Text style={{ fontSize: 12, fontWeight: "500", marginTop: 4 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
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
        <View style={{ marginBottom: 10 }}>
          {topDoctor.map((doctor, index) => (
            <DoctorCard key={index} {...doctor} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

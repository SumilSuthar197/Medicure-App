import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import {
  backgroundColor,
  textBlack,
  whiteText,
} from "../../../constants/color";
import { useDoctorProfile } from "../../../context/DoctorProfileProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ChildLayout = () => {
  const { setDoctorProfile } = useDoctorProfile();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem("doctorEmail");
        const parsedEmail = JSON.parse(email);
        const response = await axios.get(
          `https://medicure-sumilsuthar197.koyeb.app/get_doctor_profile/${parsedEmail}`
        );
        setDoctorProfile({ ...response.data });
      } catch (error) {
        if (error.response.status === 401) {
          Alert.alert("Session Expired", "Please login again", [
            {
              text: "OK",
              onPress: () => {
                AsyncStorage.removeItem("doctorInfo");
                AsyncStorage.removeItem("doctorEmail");
                router.replace("/onboarding");
              },
            },
          ]);
        }
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Schedule",
          title: "Appointment",
          name: "Appointments",
          //headerTitleAlign:"center",
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTitleStyle: {
            color: textBlack,
            fontWeight: "600",
            fontSize: 22,
            paddingLeft: 10,
          },
          headerShadowVisible: false,
          headerTintColor: whiteText,
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="list-alt" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="DoctorLeave"
        options={{
          headerTitle: "Apply for Leave",
          title: "Apply Leave",
          name: "DoctorLeave",
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTitleStyle: {
            color: textBlack,
            fontWeight: "600",
            fontSize: 22,
          },
          headerShadowVisible: false,
          headerTintColor: whiteText,
          tabBarIcon: ({ color }) => {
            return <AntDesign name="form" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="DoctorProfile"
        options={{
          title: "Profile",
          name: "profile",
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTitleStyle: {
            color: textBlack,
            fontWeight: "600",
            fontSize: 22,
          },
          headerShadowVisible: false,
          headerTintColor: whiteText,
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="user-o" size={22} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default ChildLayout;

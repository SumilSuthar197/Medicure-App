import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import {
  backgroundColor,
  textBlack,
  whiteText,
} from "../../../constants/color";
import { useDoctorProfile } from "../../../context/DoctorProfileProvider";
import { getDoctorProfile } from "../../../api/doctor";
import LoadingScreen from "../../../components/LoadingScreen";
import ErrorPage from "../../../components/ErrorPage";

const ChildLayout = () => {
  const { setDoctorProfile } = useDoctorProfile();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      setError(false);
      const email = await AsyncStorage.getItem("userEmail");
      const parsedEmail = JSON.parse(email);
      const { data } = await getDoctorProfile(parsedEmail);
      setDoctorProfile({ ...data });
    }  catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  if (loading) return <LoadingScreen text="Fetching doctor details..." />;
  if (error) return <ErrorPage errorStatus={500} />;
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Schedule",
          title: "Appointment",
          name: "Appointments",
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
        name="leave"
        options={{
          headerTitle: "Apply for Leave",
          title: "Apply Leave",
          name: "Apply Leave",
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
        name="userProfile"
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

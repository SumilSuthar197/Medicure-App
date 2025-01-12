import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import { backgroundColor, textBlack } from "../../../constants/color";
import { usePatientProfile } from "../../../context/PatientProfileProvider";
import { getPatientDashboardData } from "../../../api/patient";
import LoadingScreen from "../../../components/LoadingScreen";
import ErrorPage from "../../../components/ErrorPage";

const ChildLayout = () => {
  const { setPatientProfile } = usePatientProfile();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await getPatientDashboardData();
      setPatientProfile({ ...response.data });
      console.log(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingScreen text="Fetching patient details..." />;
  if (error) return <ErrorPage errorStatus={500} />;
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          name: "home",
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="home" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          title: "Explore",
          name: "Explore",
          tabBarIcon: ({ color }) => {
            return <Feather name="map" size={22} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          headerTitle: "MediCure ChatBot",
          title: "Chat",
          name: "chats",
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          headerTitle: "Schedule",
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTitleStyle: {
            color: textBlack,
            fontWeight: "600",
            fontSize: 22,
            paddingLeft: 10,
          },
          title: "Appointment",
          name: "booking",
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="list-alt" size={22} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="userProfile"
        options={{
          headerShown: false,
          title: "Profile",
          name: "profile",
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="user-o" size={22} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default ChildLayout;

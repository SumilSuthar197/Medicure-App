import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import { backgroundColor, textBlack } from "../../../constants/color";
import { usePatientProfile } from "../../../context/PatientProfileProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ChildLayout = () => {
  const { setPatientProfile } = usePatientProfile();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItem = await AsyncStorage.getItem("userInfo");
        const jwtToken = JSON.parse(storedItem);
        const response = await axios.get(
          `https://medicure-sumilsuthar197.koyeb.app/get_mobile_dashboard_data`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setPatientProfile({ ...response.data });
        console.log(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          Alert.alert("Session Expired", "Please login again", [
            {
              text: "OK",
              onPress: () => {
                AsyncStorage.removeItem("userInfo");
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

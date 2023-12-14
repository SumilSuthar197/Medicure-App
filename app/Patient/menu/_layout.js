import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { backgroundColor, textBlack } from "../../../constants/color";

const ChildLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          // headerTranslucent: true,
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
            return (
              <Ionicons
                name="ios-chatbubble-ellipses-outline"
                size={24}
                color={color}
              />
            );
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
                name="ios-chatbubble-ellipses-outline"
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
            paddingLeft:10
          },
          title: "Appointment",
          name: "booking",
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons
                name="ios-chatbubble-ellipses-outline"
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="userProfile"
        options={{
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

import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import {
  backgroundColor,
  textBlack,
  whiteText,
} from "../../../constants/color";

const ChildLayout = () => {
  const [loaded] = useFonts({
    PoppinsRegular: require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null; // Font is still loading
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="Appointments"
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
        name="index"
        options={{
          // headerTranslucent: true,
          headerShown: false,
          title: "Apply leave",
          name: "home",
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
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="user-o" size={22} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default ChildLayout;

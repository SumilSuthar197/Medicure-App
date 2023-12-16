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

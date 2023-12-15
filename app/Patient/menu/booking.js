import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign, Zocial, Feather, FontAwesome } from "@expo/vector-icons";
import {
  backgroundColor,
  blueColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../../constants/color";
import Animated, {
  useSharedValue,
  withTiming,
  runOnJS,
  useAnimatedStyle,
} from "react-native-reanimated";

const Booking = () => {
  const translateX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    { title: "Upcoming", index: 0 },
    { title: "Cancel", index: 1 },
    { title: "Completed", index: 2 },
  ];

  const upcomingData = [
    "Upcoming Item 1",
    "Upcoming Item 2",
    "Upcoming Item 1",
    "Upcoming Item 2",
    "Upcoming Item 1",
    "Upcoming Item 2",
  ];
  const cancelData = ["Cancelled Item 1", "Cancelled Item 2"];
  const completedData = ["Completed Item 1", "Completed Item 2"];

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        if (upcomingData.length === 0)
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: Dimensions.get("window").height * 0.1,
              }}
            >
              <Image
                source={require("../../../assets/images/Appointment.png")}
                style={{
                  width: Dimensions.get("window").width * 0.8,
                  height: Dimensions.get("window").height * 0.3,
                }}
              />
              <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 20 }}>
                You don't have an appointment yet
              </Text>
            </View>
          );
        return upcomingData.map((item, index) => (
          <View
            key={index}
            style={{
              padding: 12,
              borderRadius: 15,
              // backgroundColor: "F5F7F8",
              marginBottom: 15,
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
              <View style={{ flexDirection: "column", gap: 2 }}>
                <Text style={{ fontSize: 17, fontWeight: "600" }}>
                  Dr Sarthak Tanpure
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Zocial name="persona" size={14} color="#777777" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      color: "#777777",
                      paddingLeft: 5,
                    }}
                  >
                    Dentist Consultation
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "#777777" }}
                >
                  <Feather name="phone" size={14} color="#777777" /> +91
                  9988998899
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "#777777" }}
                >
                  <AntDesign name="calendar" size={14} color="#777777" />{" "}
                  Monday, 26 July
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "#777777" }}
                >
                  <AntDesign name="clockcircleo" size={14} color="#777777" />{" "}
                  09:00-10:00
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#dbeafe",
                  // paddingHorizontal: 32,
                  height: 40,
                  width: "45%",
                  borderRadius: 15,
                  marginTop: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                // onPress={() => {
                //   router.push("/Patient/doctorDetails");
                // }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#246BFD" }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#dbeafe",
                  // paddingHorizontal: 32,
                  height: 40,
                  width: "50%",
                  borderRadius: 15,
                  marginTop: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                // onPress={() => {
                //   router.push("/Patient/doctorDetails");
                // }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#246BFD" }}
                >
                  Reschedule
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ));
      case 1:
        if (cancelData.length === 0)
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: Dimensions.get("window").height * 0.1,
              }}
            >
              <Image
                source={require("../../../assets/images/Appointment.png")}
                style={{
                  width: Dimensions.get("window").width * 0.8,
                  height: Dimensions.get("window").height * 0.3,
                }}
              />
              <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 20 }}>
                You don't have an appointment yet
              </Text>
            </View>
          );
        return cancelData.map((item, index) => <Text key={index}>{item}</Text>);
      case 2:
        if (completedData.length === 0)
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: Dimensions.get("window").height * 0.1,
              }}
            >
              <Image
                source={require("../../../assets/images/Appointment.png")}
                style={{
                  width: Dimensions.get("window").width * 0.8,
                  height: Dimensions.get("window").height * 0.3,
                }}
              />
              <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 20 }}>
                You don't have an appointment yet
              </Text>
            </View>
          );
        return completedData.map((item, index) => (
          <Text key={index}>{item}</Text>
        ));
      default:
        return null;
    }
  };
  // const handleTabPress = (index) => {
  //   translateX.value = withTiming(index * 100);
  //   runOnJS(setActiveIndex)(index);
  // };

  // const tabContainerStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateX: translateX.value }],
  // }));

  return (
    <View style={{ flex: 1, paddingTop: 5, backgroundColor: backgroundColor }}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.index}
            // onPress={() => handleTabPress(tab.index)}
            onPress={() => setActiveIndex(tab.index)}
            style={[
              activeIndex === tab.index ? styles.activeTab : styles.inActiveTab,
            ]}
          >
            <Text
              style={[
                activeIndex === tab.index
                  ? styles.activeText
                  : styles.inActiveText,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: whiteText,
          padding: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: borderColor,
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: backgroundColor,
            paddingBottom: 15,
            borderBottomWidth: 1,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                color: textBlack,
                fontSize: 16,
                paddingBottom: 3,
                fontWeight: "600",
              }}
            >
              Dr. Sumil Suthar
            </Text>
            <Text style={{ color: "grey", fontSize: 14, fontWeight: "500" }}>
              Cardiologist
            </Text>
          </View>
          <Image
            style={{
              width: 50,
              height: 50,
              objectFit: "fill",
              borderRadius: 99,
            }}
            source={require("../../../assets/images/Image.png")}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 15,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="calendar" size={14} color="#777777" />
              <Text style={{ color: lightTextColor }}> 12/03/2023</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="clockcircleo" size={14} color="#777777" />
              <Text style={{ color: lightTextColor }}> 10:30 AM</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="circle" size={10} color="green" />
              <Text style={{ color: lightTextColor }}> Confirmed</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: backgroundColor,
                height: 40,
                width: "45%",
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
              // onPress={() => {
              //   router.push("/Patient/doctorDetails");
              // }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: textBlack }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: blueColor,
                height: 40,
                width: "50%",
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
              // onPress={() => {
              //   router.push("/Patient/doctorDetails");
              // }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: whiteText }}
              >
                Reschedule
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={{ flex: 1, paddingTop: 20 }}>
        <View style={{ paddingHorizontal: 20, marginBottom: 60 }}>
          {renderContent()}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: whiteText,
    marginHorizontal: 22,
    borderRadius: 5,
    paddingVertical: 5,
  },
  activeText: {
    textAlign: "center",
    fontSize: 16,
    color: whiteText,
    backgroundColor: blueColor,
  },
  inActiveText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777777",
    width: "100%",
  },
  activeTab: {
    paddingVertical: 5,
    backgroundColor: blueColor,
    width: "30%",
    borderRadius: 5,
  },
  inActiveTab: {
    paddingVertical: 5,
    width: "30%",
  },
});

export default Booking;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { AntDesign, Zocial, Feather } from "@expo/vector-icons";

const Booking = () => {
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
        return upcomingData.map((item, index) => (
          // <Text key={index}>{item}</Text>
          <View
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
              <View style={{flexDirection:"column",gap:2}}>
                <Text style={{ fontSize: 17, fontWeight: "600" }}>
                  Dr Sarthak Tanpure
                </Text>
                <View style={{flexDirection:"row"}}>
                  <Zocial name="persona" size={14} color="#777777" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      color: "#777777",
                      paddingLeft:5
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
        return cancelData.map((item, index) => <Text key={index}>{item}</Text>);
      case 2:
        return completedData.map((item, index) => (
          <Text key={index}>{item}</Text>
        ));
      default:
        return null;
    }
  };

  return (
    <View style={{ paddingTop: 5, backgroundColor: "#FFF" }}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.index}
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

      <ScrollView style={{ paddingTop: 20 }}>
        <View style={{ paddingHorizontal: 20, marginBottom: 60 }}>
          {renderContent()}
        </View>
      </ScrollView>

      {/* <View>{renderContent()}</View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  activeText: { textAlign: "center", fontSize: 16, color: "#246BFD" },
  inActiveText: { textAlign: "center", fontSize: 16, color: "#777777" },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#246BFD",
    padding: 3,
    // width: "30%",
  },
  inActiveTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#777777",
    padding: 3,
    // width: "40%",
  },
});

export default Booking;

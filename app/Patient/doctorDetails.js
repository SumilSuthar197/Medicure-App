import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { iconItem } from "../../constants/data";
import PrimaryButton from "../../components/PrimaryButton";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  backgroundColor,
  blueColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import { useSharedValue } from "react-native-reanimated";

import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";

const doctorDetails = () => {
  const data = [
    "Cardiology",
    "Orthopedics",
    "Dermatology",
    "Neurology",
    "Gastroenterology",
  ];

  const translateX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    { title: "Profile", index: 0 },
    { title: "Contact", index: 1 },
    { title: "Review", index: 2 },
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

  const location = {
    latitude: 19.3046288,
    longitude: 72.8544423,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return (
          <View>
            <View style={styles.bottomCard}>
              <Text style={styles.bottomCardTitle}>About</Text>
              <Text style={styles.bottomCardText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </View>
            <View
              style={{
                marginVertical: 10,
              }}
            >
              <Text style={styles.bottomCardTitle}>Speciality</Text>
              {data.map((specialty, index) => (
                <Text key={index} style={styles.bottomCardText}>
                  {specialty}
                </Text>
              ))}
            </View>
          </View>
        );
      case 1:
        return (
          <View>
            <Text style={styles.bottomCardTitle}>Contact Info</Text>
            <View>
              <View style={styles.contactRow}>
                <Ionicons name="md-call" size={20} color={lightTextColor} />
                <Text style={styles.bottomCardText2}> 123456789</Text>
              </View>
              <View style={styles.contactRow}>
                <Ionicons name="md-mail" size={20} color={lightTextColor} />
                <Text style={styles.bottomCardText2}> sarthak@gmail.com</Text>
              </View>
              <View style={styles.contactRow}>
                <FontAwesome5
                  name="location-arrow"
                  size={18}
                  color={lightTextColor}
                />
                <Text style={styles.bottomCardText2}>
                  {" "}
                  Linking Road, Bandra 400050
                </Text>
              </View>
            </View>
            <View
              style={{ borderRadius: 25, overflow: "hidden", marginTop: 20 }}
            >
              <MapView
                style={{ flex: 1, height: 200 }}
                initialRegion={location}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
              >
                <Marker coordinate={location} title="Your Location" />
              </MapView>
            </View>
          </View>
        );
      case 2:
        return completedData.map((item, index) => (
          <View
            key={index}
            style={{
              marginVertical: 10,
              padding: 12,
              borderRadius: 15,
              backgroundColor: whiteText,
              borderWidth: 1,
              borderColor: borderColor,
            }}
          >
            <View style={{ flexDirection: "row", gap: 20 }}>
              <View>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "fill",
                    borderRadius: 99,
                  }}
                  source={require("../../assets/images/Image.png")}
                />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flex: 1,
                }}
              >
                <View style={{ justifyContent: "center", gap: 2 }}>
                  <Text style={styles.bottomCardTitle2}>
                    Dr Sarthak Tanpure
                  </Text>
                  <Text style={styles.bottomCardText3}>2 days ago</Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FFF2CC",
                    borderRadius: 25,
                    paddingHorizontal: 8,
                    flexDirection: "row",
                    height: 30,
                  }}
                >
                  <AntDesign name="star" size={15} color="#F2921D" />
                  <Text>5.0</Text>
                </View>
              </View>
            </View>
            <View style={{ paddingTop: 8 }}>
              <Text style={styles.bottomCardText}>
                Many thanks to Dr. Sarthak! he is professional and best doctor
              </Text>
            </View>
          </View>
        ));
      default:
        return null;
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.topContainer}>
        <View style={styles.topCard}>
          <View style={{ borderRadius: 15 }}>
            <Image
              style={styles.doctorImage}
              source={require("../../assets/images/Image.png")}
            />
          </View>
          <View style={styles.topCardRow}>
            <Text style={styles.doctorName}>Dr Sarthak Tanpure</Text>
            <Text style={styles.doctorType}>Dentist</Text>
            <Text style={styles.doctorReviews}>4.8 (2.3K review)</Text>
          </View>
        </View>
        {/* <View style={styles.button}>
            <PrimaryButton
              backgroundColor={blueColor}
              style={{ borderWidth: 1, borderColor: whiteText, width: "47%" }}
              color={whiteText}
              labelStyle={{ paddingHorizontal: 0 }}
              label="Call the Doctor"
              // onPress={(}
            />
            <PrimaryButton
              backgroundColor={blueColor}
              style={{ borderWidth: 1, borderColor: whiteText, width: "47%" }}
              labelStyle={{ paddingHorizontal: 0 }}
              color={whiteText}
              label="Call the Doctor"
              // onPress={(}
            />
          </View> */}
        {/* <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingTop: 20,
              paddingBottom: 0,
              borderTopWidth: 1,
              borderTopColor: "#e5e5e5",
            }}
          >
            {iconItem.map((item, index) => (
              <View
                key={index}
                style={{ width: "25%", alignItems: "center", marginBottom: 10 }}
              >
                <View
                  style={{
                    backgroundColor: "#dbeafe",
                    padding: 15,
                    borderRadius: 99,
                  }}
                >
                  {item.icon}
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    marginTop: 4,
                    color: "#246BFD",
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ color: "#777777" }}>Patients</Text>
              </View>
            ))}
          </View> */}
        <View style={styles.bottonContainer}>
          <View style={styles.tabContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.index}
                // onPress={() => handleTabPress(tab.index)}
                onPress={() => setActiveIndex(tab.index)}
                style={[
                  activeIndex === tab.index
                    ? styles.activeTab
                    : styles.inActiveTab,
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
            <View
              style={{
                paddingHorizontal: 5,
                marginBottom: 60,
              }}
            >
              {renderContent()}
            </View>
          </ScrollView>

          <PrimaryButton
            style={{ marginVertical: 15 }}
            backgroundColor="#246BFD"
            color="#FFF"
            label="Book Appointment"
            onPress={() => router.push("./bookAppointment")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: blueColor },
  topContainer: {
    flex: 1,
    paddingTop: 20,
  },
  doctorImage: {
    width: 100,
    height: 100,
    objectFit: "fill",
    borderRadius: 75,
  },
  topCard: {
    flexDirection: "row",
    gap: 15,
    paddingBottom: 15,
    paddingHorizontal: 25,
    marginBottom: 20,
    flex: 1,
    alignItems: "center",
  },
  topCardRow: {
    justifyContent: "center",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  doctorType: {
    fontSize: 17,
    fontWeight: "400",
    marginBottom: 15,
    color: whiteText,
  },
  doctorName: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 3,
    color: whiteText,
  },
  doctorReviews: { fontSize: 13, color: whiteText },
  button: { flexDirection: "row" },
  bottonContainer: {
    borderRadius: 35,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: whiteText,
    paddingHorizontal: 20,
    paddingTop: 15,
    flex: 5,
    height: "100%",
  },
  bottomCardText: { color: lightTextColor, fontSize: 16, lineHeight: 22 },
  bottomCardText2: {
    color: lightTextColor,
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 5,
  },
  bottomCardText3: {
    color: lightTextColor,
    fontSize: 16,
  },
  bottomCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: textBlack,
  },
  bottomCardTitle2: {
    fontSize: 18,
    fontWeight: "600",
    color: textBlack,
  },
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: backgroundColor,
    // marginHorizontal: 22,
    borderRadius: 25,
    // paddingVertical: 5,
  },
  activeText: {
    textAlign: "center",
    fontSize: 16,
    borderRadius: 25,
    color: whiteText,
    overflow: "hidden",
    backgroundColor: blueColor,
    paddingVertical: 6,
  },
  inActiveText: {
    textAlign: "center",
    fontSize: 16,
    borderRadius: 25,
    color: "#777777",
    width: "100%",
  },
  activeTab: {
    paddingVertical: 5,
    // backgroundColor: blueColor,
    borderRadius: 25,
    overflow: "hidden",
    width: "30%",
    borderRadius: 5,
  },
  inActiveTab: {
    borderRadius: 25,
    paddingVertical: 5,
    width: "30%",
  },
  contactRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  // activeView: { borderRadius: 25 },
});
export default doctorDetails;

{
  /* <View style={styles.main}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            paddingHorizontal: 23,
            paddingTop: 20,
          }}
        >
          <View style={{ flexDirection: "row", gap: 20, paddingBottom: 15 }}>
            <View style={{ borderRadius: 15 }}>
              <Image
                style={{
                  width: 100,
                  height: 110,
                  objectFit: "fill",
                  borderRadius: 75,
                }}
                source={require("../../assets/images/Image.png")}
              />
            </View>
            <View
              style={{ justifyContent: "center", alignItems: "flex-start" }}
            >
              <Text
                style={{ fontSize: 22, fontWeight: "500", marginBottom: 3 }}
              >
                Dr Sarthak Tanpure
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: "400", marginBottom: 2 }}
              >
                Dentist
              </Text>
              <Text style={{ fontSize: 16 }}>Chembur,Mumbai</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingTop: 20,
              paddingBottom: 0,
              borderTopWidth: 1,
              borderTopColor: "#e5e5e5",
            }}
          >
            {iconItem.map((item, index) => (
              <View
                key={index}
                style={{ width: "25%", alignItems: "center", marginBottom: 10 }}
              >
                <View
                  style={{
                    backgroundColor: "#dbeafe",
                    padding: 15,
                    borderRadius: 99,
                  }}
                >
                  {item.icon}
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    marginTop: 4,
                    color: "#246BFD",
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ color: "#777777" }}>Patients</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
              About
            </Text>
            <Text style={{ color: "#777777", fontSize: 16, lineHeight: 22 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
              Speciality
            </Text>
            {data.map((specialty, index) => (
              <Text
                key={index}
                style={{ color: "#777777", fontSize: 16, lineHeight: 24 }}
              >
                {specialty}
              </Text>
            ))}
          </View>
          <PrimaryButton
            style={{ marginBottom: 30 }}
            backgroundColor="#246BFD"
            color="#FFF"
            label="Book Appointment"
            onPress={() => router.push("./bookAppointment")}
          />
        </View>
      </ScrollView> 
      </View>*/
}

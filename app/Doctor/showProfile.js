import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  backgroundColor,
  blueColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import { backendUrl } from "../../constants/URL";
import { StatusBar } from "expo-status-bar";

const showProfile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const doctorData = useLocalSearchParams();
  const [doctorCompleteData, setDoctorCompleteData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/get_doctor_email/${doctorData.email}`
        );
        setDoctorCompleteData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const tabs = [
    { title: "Profile", index: 0 },
    { title: "Contact", index: 1 },
    { title: "Review", index: 2 },
  ];

  const location = {
    latitude: 25.3046288,
    longitude: 69.8544423,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        const daysOfWeek = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        return (
          <View>
            <View>
              <Text style={styles.bottomCardTitle}>About</Text>
              <Text style={styles.bottomCardText}>
                {doctorCompleteData.bio}
              </Text>
            </View>
            <View style={styles.scheduleContainer}>
              <Text style={styles.bottomCardTitle}>Schedule</Text>
              {doctorCompleteData.schedule &&
                daysOfWeek.map((day, index) => (
                  <Text key={index} style={styles.bottomCardText}>
                    {day}: {doctorCompleteData.schedule[index] || "No Hospital"}
                  </Text>
                ))}
            </View>
          </View>
        );
      case 1:
        return (
          <View>
            <Text style={styles.bottomCardTitle}>Contact Info</Text>
            <View style={styles.contactRow}>
              <Ionicons name="md-call" size={20} color={lightTextColor} />
              <Text style={[styles.bottomCardText, { marginLeft: 5 }]}>
                {doctorCompleteData.mobile}
              </Text>
            </View>
            <View style={styles.contactRow}>
              <Ionicons name="md-mail" size={20} color={lightTextColor} />
              <Text style={[styles.bottomCardText, { marginLeft: 5 }]}>
                {doctorData.email}
              </Text>
            </View>
            <View style={styles.contactRow}>
              <FontAwesome5
                name="location-arrow"
                size={18}
                color={lightTextColor}
              />
              <Text style={[styles.bottomCardText, { marginLeft: 5 }]}>
                {doctorCompleteData.hospital.location
                  ? doctorCompleteData.hospital.location
                  : "Hospital Address:"}
              </Text>
            </View>
            <View style={styles.mapContainer}>
              <MapView
                style={{ flex: 1, height: 200 }}
                initialRegion={{
                  latitude: doctorCompleteData.location.latitude,
                  longitude: doctorCompleteData.location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                provider={PROVIDER_GOOGLE}
              >
                <Marker
                  coordinate={{
                    latitude: doctorCompleteData.location.latitude,
                    longitude: doctorCompleteData.location.longitude,
                  }}
                  title="Doctor's Location"
                />
              </MapView>
            </View>
          </View>
        );
      case 2:
        return doctorCompleteData.ratings.map((item, index) => (
          <View key={index} style={styles.reviewContainer}>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Image
                style={styles.reviewerImage}
                source={{
                  uri: item.image
                    ? item.image
                    : "https://res.cloudinary.com/deohymauz/image/upload/v1698928101/samples/people/kitchen-bar.jpg",
                }}
              />
              <View style={styles.reviewRow1}>
                <View style={styles.reviewNameView}>
                  <Text style={[styles.bottomCardTitle, { marginBottom: 0 }]}>
                    {item.patient}
                  </Text>
                </View>
                <View style={styles.reviewRating}>
                  <AntDesign name="star" size={15} color="#F2921D" />
                  <Text>{item.rating}</Text>
                </View>
              </View>
            </View>
            <Text
              style={[styles.bottomCardText, { paddingTop: 8, paddingLeft: 2 }]}
            >
              {item.description}
            </Text>
          </View>
        ));
      default:
        return null;
    }
  };
  return (
    <View style={styles.main}>
      <StatusBar
        backgroundColor={blueColor}
        translucent={false}
        style="light"
      />
      <View style={styles.topCard}>
        <View style={{ borderRadius: 15 }}>
          <Image
            style={styles.doctorImage}
            source={{
              uri: doctorCompleteData.image
                ? doctorCompleteData.image
                : "https://res.cloudinary.com/deohymauz/image/upload/v1704545467/demoDoctor_hkhmdp.jpg",
            }}
          />
        </View>
        <View style={styles.topCardRow}>
          <Text style={styles.doctorName}>{doctorCompleteData.name}</Text>
          <Text style={styles.doctorType}>
            {doctorCompleteData.education && doctorCompleteData.education.field}
          </Text>
          <Text style={styles.doctorReviews}>
            {doctorData.rating} ({doctorData.count} review)
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.index}
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

        <ScrollView style={styles.scrollView}>{renderContent()}</ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: blueColor, paddingTop: 20 },
  topCard: {
    flexDirection: "row",
    gap: 15,
    paddingBottom: 15,
    paddingHorizontal: 25,
    marginBottom: 20,
    flex: 1,
    alignItems: "center",
  },
  doctorImage: {
    width: 100,
    height: 100,
    objectFit: "fill",
    borderRadius: 75,
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
  bottomCardText: { color: lightTextColor, fontSize: 16, lineHeight: 22 },
  bottomCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: textBlack,
  },
  scheduleContainer: { marginVertical: 10 },
  contactRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  mapContainer: { borderRadius: 25, overflow: "hidden", marginTop: 20 },
  reviewContainer: {
    marginVertical: 10,
    padding: 12,
    borderRadius: 15,
    backgroundColor: whiteText,
    borderWidth: 1,
    borderColor: borderColor,
  },
  reviewerImage: {
    width: 35,
    height: 35,
    objectFit: "fill",
    borderRadius: 99,
  },
  reviewRow1: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
  },
  reviewNameView: {
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 2,
  },
  reviewRating: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF2CC",
    borderRadius: 25,
    paddingHorizontal: 8,
    flexDirection: "row",
    height: 30,
  },
  bottomContainer: {
    borderRadius: 35,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: whiteText,
    paddingHorizontal: 20,
    paddingTop: 15,
    flex: 5,
    height: "100%",
  },
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: backgroundColor,
    borderRadius: 25,
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
  scrollView: {
    paddingHorizontal: 5,
    marginBottom: 60,
    paddingTop: 20,
  },
});
export default showProfile;

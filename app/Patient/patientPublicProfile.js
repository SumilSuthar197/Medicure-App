import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { iconItem } from "../../constants/data";
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
import { useSharedValue } from "react-native-reanimated";

import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backendUrl } from "../../constants/URL";
import axios from "axios";

const patientPublicProfile = () => {
  const translateX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const item = useLocalSearchParams();
  console.log(item);
  const [user, setUser] = useState({ ...item });
  const tabs = [
    { title: "Profile", index: 0 },
    { title: "Report", index: 1 },
  ];

  // const [patientData, setPatientData] = useState({});
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const storedItem = await AsyncStorage.getItem("userInfo");
  //       const jwtToken = JSON.parse(storedItem);
  //       // console.log(`Bearer ${jwtToken}`);
  //       const response = await axios.get(`${backendUrl}/patientprofile`, {
  //         headers: {
  //           Authorization: `Bearer ${jwtToken}`,
  //         },
  //       });
  //       setPatientData({ ...response.data });
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
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
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.bottomCardTitle}>Personal Details</Text>
              <View>
                <View style={styles.contactRow}>
                  <Text style={styles.bottomCardText}>
                    Height: {user.height} cm
                  </Text>
                </View>
                <View style={styles.contactRow}>
                  <Text style={styles.bottomCardText}>
                    Weight: {user.weight} kg
                  </Text>
                </View>
                <View style={styles.contactRow}>
                  <Text style={styles.bottomCardText}>
                    Gender: {user.gender}
                  </Text>
                </View>
                <View style={styles.contactRow}>
                  <Text style={styles.bottomCardText}>
                    Blood Group: {user.bloodGroup}
                  </Text>
                </View>
                <View style={styles.contactRow}>
                  <Text style={styles.bottomCardText}>
                    Date of Birth: {new Date(user.dob).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.bottomCardTitle}>Contact Info</Text>
              <View>
                <View style={styles.contactRow}>
                  <Ionicons name="md-call" size={20} color={lightTextColor} />
                  <Text style={styles.bottomCardText2}> {user.mobile}</Text>
                </View>
                <View style={styles.contactRow}>
                  <Ionicons name="md-mail" size={20} color={lightTextColor} />
                  <Text style={styles.bottomCardText2}> {user.email}</Text>
                </View>
                <View style={styles.contactRow}>
                  <FontAwesome5
                    name="location-arrow"
                    size={18}
                    color={lightTextColor}
                  />
                  <Text style={styles.bottomCardText2}> {user.address}</Text>
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
                  {/* <Marker coordinate={location} title="Your Location" /> */}
                </MapView>
              </View>
            </View>
          </View>
        );
      case 1:
        return (
          <View>
            <Text style={styles.bottomCardTitle}>Prescription:</Text>
            <View>
              <View>
                {/*  */}
                <View
                  style={{
                    marginVertical: 10,
                    padding: 12,
                    borderRadius: 15,
                    backgroundColor: whiteText,
                    borderWidth: 1,
                    borderColor: borderColor,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ gap: 3, justifyContent: "center" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "600",
                          color: textBlack,
                        }}
                      >
                        Report 1 - 12/12/2020
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: "500",
                          color: lightTextColor,
                        }}
                      >
                        Prescribed by Dr. Sarthak Tanpure
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: textBlack,
                        paddingHorizontal: 5,
                      }}
                    >
                      <TouchableOpacity>
                        <AntDesign name="download" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {/*  */}
                {/*  */}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: Dimensions.get("window").height * 0.1,
                  }}
                >
                  <Image
                    source={require("../../assets/images/Appointment.png")}
                    style={{
                      width: Dimensions.get("window").width * 0.8,
                      height: Dimensions.get("window").height * 0.3,
                    }}
                  />
                  <Text
                    style={{ fontSize: 18, fontWeight: "600", marginTop: 20 }}
                  >
                    You don't have any report yet
                  </Text>
                </View>
                {/*  */}
              </View>
            </View>
          </View>
        );
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
              source={
                user.imageUrl
                  ? { uri: user.imageUrl }
                  : require("../../assets/images/Image.png")
              }
            />
          </View>
          <View style={styles.topCardRow}>
            <Text style={styles.doctorName}>{user.name}</Text>
            <Text style={styles.doctorType}>{user.city}</Text>
            {/* <TouchableOpacity
              style={styles.call}
              onPress={() => Linking.openURL(`tel:${user.mobile}`)}
            >
              <Text style={styles.doctorReviews}>Call Patient</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.bottonContainer}>
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
  call: {
    borderWidth: 1,
    borderColor: whiteText,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 6,
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
    width: "40%",
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

export default patientPublicProfile;

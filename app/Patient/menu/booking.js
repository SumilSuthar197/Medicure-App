import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { backendUrl } from "../../../constants/URL";
import { router } from "expo-router";

const Booking = () => {
  const translateX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  // const [patientData, setPatientData] = useState({});
  const [upcomingData, setUpcomingData] = useState([]);
  const [cancelData, setCancelData] = useState([]);
  const [completedData, setCompletedData] = useState([]);

  async function cancelAppointment(appointment_id, email, date) {
    try {
      const response = axios.post(
        `${backendUrl}/cancel_appointment_after/${appointment_id}`,
        { appointment_id, email, date }
      );
      console.log("appointment sent to backend:", response.data);
    } catch (error) {
      console.error("Error sending location to backend:", error);
    }
  }

  function getUpcomingData(data) {
    setUpcomingData(data);
  }

  function getCancelData(data) {
    setCancelData(data);
  }

  function getCompletedData(data) {
    setCompletedData(data);
  }

  useEffect(() => {
    const fetchData = async (typeOfAppointment, settingFunction) => {
      try {
        const storedItem = await AsyncStorage.getItem("userInfo");
        const jwtToken = JSON.parse(storedItem);
        // console.log(`Bearer ${jwtToken}`);
        const response = await axios.get(
          `${backendUrl}/get_appt/${typeOfAppointment}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        settingFunction(response.data.appointments);
        // setPatientData({ ...response.data });
        console.log(response.data.appointments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData("UPCOMING", getUpcomingData);
  }, []);

  const tabs = [
    { title: "UPCOMING", index: 0 },
    { title: "CANCEL", index: 1 },
    { title: "COMPLETED", index: 2 },
  ];

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        // console.log(upcomingData);
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
              backgroundColor: whiteText,
              padding: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: borderColor,
              marginVertical: 8,
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
                  Dr. {item.doctor_name}
                </Text>
                <Text
                  style={{ color: "grey", fontSize: 14, fontWeight: "500" }}
                >
                  {item.doctor_email}
                </Text>
              </View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "fill",
                  borderRadius: 99,
                }}
                source={
                  item.image
                    ? { uri: item.image }
                    : require("../../../assets/images/Image.png")
                }
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
                  <Text style={{ color: lightTextColor, marginLeft: 5 }}>
                    {item.date}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="clockcircleo" size={14} color="#777777" />
                  <Text style={{ color: lightTextColor }}>
                    {" "}
                    {item.time || "10:30 AM"}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome
                    name="circle"
                    size={10}
                    color={item.status === "UPCOMING" ? "green" : "red"}
                  />
                  <Text style={{ color: lightTextColor }}> Confirmed</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
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
                  onPress={async () => {
                    try {
                      const storedItem = await AsyncStorage.getItem("userInfo");
                      const jwtToken = JSON.parse(storedItem);
                      const response = await axios.post(
                        `${backendUrl}/cancel_appt`,
                        {
                          time: item.time,
                          doctor_email: item.doctor_email,
                          date: item.date,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${jwtToken}`,
                          },
                        }
                      );
                      console.log(response.data.msg);
                    } catch (error) {
                      console.error(
                        "Error sending location to backend:",
                        error
                      );
                    }
                    // router.push("/Patient/doctorDetails");
                    handleTabPress(0);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: textBlack,
                    }}
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
                  onPress={async () => {
                    try {
                      const storedItem = await AsyncStorage.getItem("userInfo");
                      const jwtToken = JSON.parse(storedItem);
                      const response = await axios.post(
                        `${backendUrl}/cancel_appt`,
                        {
                          time: item.time,
                          doctor_email: item.doctor_email,
                          date: item.date,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${jwtToken}`,
                          },
                        }
                      );
                      console.log(response.data.msg);
                      router.push({
                        pathname: "/Patient/doctorDetails",
                        params: { email: item.doctor_email },
                      });
                    } catch (error) {
                      console.error(
                        "Error sending location to backend:",
                        error
                      );
                    }
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: whiteText,
                    }}
                  >
                    Reschedule
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ));
      case 1:
        // console.log(cancelData);
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
        return cancelData.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: whiteText,
              padding: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: borderColor,
              marginVertical: 8,
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
                  Dr. {item.doctor_name}
                </Text>
                <Text
                  style={{ color: "grey", fontSize: 14, fontWeight: "500" }}
                >
                  {item.doctor_email}
                </Text>
              </View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "fill",
                  borderRadius: 99,
                }}
                source={
                  item.image
                    ? { uri: item.image }
                    : require("../../../assets/images/Image.png")
                }
              />
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 16,
                  paddingBottom: 5,
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
                  <Text style={{ color: lightTextColor, marginLeft: 5 }}>
                    {item.date}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="clockcircleo" size={14} color="#777777" />
                  <Text style={{ color: lightTextColor }}>
                    {item.time || "10:30 AM"}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="circle" size={10} color="red" />
                  <Text style={{ color: lightTextColor }}> Cancelled</Text>
                </View>
              </View>
            </View>
          </View>
        ));
      case 2:
        // console.log(completedData);
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
          <View
            key={index}
            style={{
              backgroundColor: whiteText,
              padding: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: borderColor,
              marginVertical: 8,
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
                  Dr. {item.doctor_name}
                </Text>
                <Text
                  style={{ color: "grey", fontSize: 14, fontWeight: "500" }}
                >
                  {item.doctor_email}
                </Text>
              </View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "fill",
                  borderRadius: 99,
                }}
                source={
                  item.image
                    ? { uri: item.image }
                    : require("../../../assets/images/Image.png")
                }
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
                  <Text style={{ color: lightTextColor }}>{item.date}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="clockcircleo" size={14} color="#777777" />
                  <Text style={{ color: lightTextColor }}>
                    {item.time || "10:30 AM"}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome
                    name="circle"
                    size={10}
                    color={item.status === "UPCOMING" ? "green" : "red"}
                  />
                  <Text style={{ color: lightTextColor }}> Completed</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
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
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: textBlack,
                    }}
                  >
                    Review
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
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: whiteText,
                    }}
                  >
                    Prescription
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ));
      default:
        return null;
    }
  };

  const handleTabPress = async (index) => {
    setActiveIndex(index);
    const typeOfAppointment = tabs[index].title; // Get the type of appointment based on the selected tab
    try {
      const storedItem = await AsyncStorage.getItem("userInfo");
      const jwtToken = JSON.parse(storedItem);

      const response = await axios.get(
        `${backendUrl}/get_appt/${typeOfAppointment}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      switch (typeOfAppointment) {
        case "UPCOMING":
          setUpcomingData(response.data.appointments);
          break;
        case "CANCEL":
          setCancelData(response.data.appointments);
          break;
        case "COMPLETED":
          setCompletedData(response.data.appointments);
          break;
        default:
          break;
      }

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 5, backgroundColor: backgroundColor }}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.index}
            // onPress={() => handleTabPress(tab.index)}
            onPress={() => handleTabPress(tab.index)}
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

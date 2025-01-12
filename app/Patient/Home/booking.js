import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import {
  backgroundColor,
  blueColor,
  whiteText,
} from "../../../constants/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { router } from "expo-router";
import ErrorPage from "../../../components/ErrorPage";
import AppointmentCard from "../../../components/AppointmentCard";
import { cancelAppointment, getAppointmentList } from "../../../api/patient";
import LoadingScreen from "../../../components/LoadingScreen";

const Booking = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [upcomingData, setUpcomingData] = useState([]);
  const [cancelData, setCancelData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const tabs = [
    { title: "UPCOMING", index: 0 },
    { title: "CANCELLED", index: 1 },
    { title: "COMPLETED", index: 2 },
  ];

  const handleCancel = async (id) => {
    try {
      const response = await cancelAppointment(id);
      if (response.data.output === true) {
        Alert.alert(
          "Appointment Cancelled",
          "Your appointment has been successfully cancelled. We hope to see you again soon.",
          [{ text: "OK", onPress: () => fetchAppointments(0) }]
        );
      } else {
        Alert.alert(
          "Appointment Cancelled Failed",
          "Your appointment has not been cancelled. Please try again later."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReschedule = async ({ time, doctor_email, date }) => {
    try {
      const response = await axios.post(
        `https://medicure-sumilsuthar197.koyeb.app/cancel_appt`,
        {
          time: time,
          doctor_email: doctor_email,
          date: date,
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
      console.error("Error sending location to backend:", error);
    }
  };

  const fetchAppointments = async (index) => {
    try {
      setLoading(true);
      setActiveIndex(index);
      const typeOfAppointment = tabs[index].title;
      const response = await getAppointmentList(typeOfAppointment);

      switch (typeOfAppointment) {
        case "UPCOMING":
          setUpcomingData(response.data.appointments);
          break;
        case "CANCELLED":
          setCancelData(response.data.appointments);
          break;
        case "COMPLETED":
          setCompletedData(response.data.appointments);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments(0);
  }, []);

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        if (upcomingData.length === 0)
          return (
            <ErrorPage
              height={Dimensions.get("window").height}
              width={Dimensions.get("window").width}
              textContent="You don't have an appointment yet"
            />
          );
        return upcomingData.map((item, index) => (
          <AppointmentCard
            key={index}
            item={{ ...item, button1: "Cancel", button2: "Reschedule" }}
            handleButton1={handleCancel}
            handleButton2={handleReschedule}
          />
        ));
      case 1:
        if (cancelData.length === 0)
          return (
            <ErrorPage
              height={Dimensions.get("window").height}
              width={Dimensions.get("window").width}
              textContent="No cancelled appointments found"
            />
          );

        return cancelData.map((item, index) => (
          <AppointmentCard key={index} item={item} />
        ));
      case 2:
        if (completedData.length === 0)
          return (
            <ErrorPage
              height={Dimensions.get("window").height}
              width={Dimensions.get("window").width}
              textContent="You don't have an appointment yet"
            />
          );
        return completedData.map((item, index) => (
          <AppointmentCard
            key={index}
            item={{
              ...item,
              button1: "Rate Doctor",
              button2: " View Prescription",
            }}
            handleButton1={() =>
              Alert.alert(
                "Rate Your Experience",
                `Please rate your experience with Dr. ${item.doctor_name} to help us improve our services.`,
                [
                  {
                    text: "Poor",
                    onPress: () => console.log("User rated: Poor"),
                  },
                  {
                    text: "Good",
                    onPress: () => console.log("User rated: Good"),
                  },
                  {
                    text: "Excellent",
                    onPress: () => console.log("User rated: Excellent"),
                  },
                ]
              )
            }
            handleButton2={() => Linking.openURL(item.image)}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 5, backgroundColor: backgroundColor }}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.index}
            onPress={() => fetchAppointments(tab.index)}
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
          {loading ? (
            <View
              style={{
                flex: 1,
                marginTop: Dimensions.get("window").height * 0.25,
                justifyContent: "center",
              }}
            >
              <LoadingScreen text="Fetching your appointment list. Please wait..." />
            </View>
          ) : (
            renderContent()
          )}
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

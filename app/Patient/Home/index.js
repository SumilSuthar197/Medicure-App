import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { usePatientProfile } from "../../../context/PatientProfileProvider";
import Header from "../../../components/HomeComponent/Header";
import BlueCard from "../../../components/HomeComponent/BlueCard";
import DoctorCard from "../../../components/HomeComponent/DoctorCard";
import LoadingScreen from "../../../components/LoadingScreen";
import { getTopDoctors } from "../../../api/patient";
import { iconItem } from "../../../constants/data";
import { router } from "expo-router";
import {
  backgroundColor,
  blueColor,
  textBlack,
} from "../../../constants/color";

const index = () => {
  const { patientProfile } = usePatientProfile();
  const [upcomingData, setUpcomingData] = useState([]);
  const [topDoctor, setTopDoctor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (patientProfile?.upcoming_appointments) {
      setUpcomingData(patientProfile.upcoming_appointments);
    }
  }, [patientProfile]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await getTopDoctors();
      setTopDoctor(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen text="Fetching patient details..." />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        style="dark"
        backgroundColor={backgroundColor}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Upcoming Appointments</Text>
          <TouchableOpacity
            onPress={() => router.push("/Patient/Home/booking")}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <BlueCard
          containAppointment={upcomingData && upcomingData.length > 0}
          name={upcomingData[0]?.doctor_name}
          imagePath={upcomingData[0]?.image}
          type={upcomingData[0]?.doctor_email}
          Date={upcomingData[0]?.date}
          Time={upcomingData[0]?.slot}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Doctor Speciality</Text>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/Patient/DoctorSearch",
                params: { containCategory: "" },
              })
            }
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.iconContainer}>
          {iconItem.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.iconItem}
              onPress={() =>
                router.push({
                  pathname: "/Patient/DoctorSearch",
                  params: { containCategory: item.name },
                })
              }
            >
              <View style={styles.iconWrapper}>
                <Image source={{ uri: item.icon }} style={styles.iconImage} />
              </View>
              <Text style={styles.iconText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.hospitalSearchButton}
            onPress={() => {
              router.push("/Patient/HospitalSearch");
            }}
          >
            <Text style={styles.hospitalSearchButtonText}>
              + Search By Hospital
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Top Specialist</Text>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/Patient/DoctorSearch",
                params: { containCategory: "" },
              })
            }
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.topSpecialistContainer}>
          {topDoctor.map((doctor, index) => (
            <DoctorCard key={index} {...doctor} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 7,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: backgroundColor,
  },
  sectionHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 15,
  },
  sectionHeaderText: {
    color: textBlack,
    fontSize: 18,
    fontWeight: "600",
  },
  seeAllText: {
    color: blueColor,
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  iconItem: {
    width: "25%",
    alignItems: "center",
    marginBottom: 10,
  },
  iconWrapper: {
    backgroundColor: blueColor,
    padding: 15,
    borderRadius: 15,
  },
  iconImage: {
    width: 30,
    height: 30,
    overlayColor: "#dbeafe",
    tintColor: "#dbeafe",
  },
  iconText: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  hospitalSearchButton: {
    backgroundColor: blueColor,
    width: "50%",
    paddingHorizontal: 0,
    borderRadius: 10,
    paddingVertical: 5,
  },
  hospitalSearchButtonText: {
    color: "#FFF",
    textAlign: "center",
  },
  topSpecialistContainer: {
    marginBottom: 10,
  },
});

export default index;

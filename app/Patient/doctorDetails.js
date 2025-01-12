import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { router, useLocalSearchParams } from "expo-router";
import {
  backgroundColor,
  blueColor,
  lightTextColor,
  whiteText,
} from "../../constants/color";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import Profile from "../../components/Doctor/Profile";
import Contact from "../../components/Doctor/Contact";
import RatingCard from "../../components/RatingCard";

const doctorDetails = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const doctorData = useLocalSearchParams();
  const [doctorCompleteData, setDoctorCompleteData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://medicure-sumilsuthar197.koyeb.app/get_doctor_profile/${doctorData.email}`
        );
        setDoctorCompleteData(response.data);
        console.log(response.data.questions);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const tabs = [
    { title: "Profile", index: 0 },
    { title: "Contact", index: 1 },
    { title: "Review", index: 2 },
  ];

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return (
          <Profile
            bio={doctorCompleteData.bio}
            schedule={doctorCompleteData.schedule}
            duration={doctorCompleteData.patient_duration}
          />
        );
      case 1:
        return (
          <Contact
            mobile={doctorCompleteData.mobile}
            email={doctorCompleteData.email}
            coordinate={doctorCompleteData.location}
            location={
              `${doctorCompleteData.hospital[0].name}, ${doctorCompleteData.hospital[0].location}` ||
              "India"
            }
          />
        );
      case 2:
        if (doctorCompleteData.rating_count === 0)
          return <Text style={styles.bottomCardText}>No reviews yet</Text>;
        return doctorCompleteData.ratings.map((item, index) => (
          <RatingCard
            key={index}
            name={item.patient}
            image={
              item.image ||
              "https://res.cloudinary.com/deohymauz/image/upload/v1698928101/samples/people/kitchen-bar.jpg"
            }
            description={item.description}
            score={item.rating}
          />
        ));
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <StatusBar
          backgroundColor={blueColor}
          translucent={false}
          style="light"
        />
        <ActivityIndicator size="large" color="#FFF" />
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: whiteText }}>Loading...</Text>
        </View>
      </View>
    );
  }

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
              uri: doctorCompleteData.image,
            }}
          />
        </View>
        <View style={styles.topCardRow}>
          <Text style={styles.doctorName}>{doctorCompleteData.name}</Text>
          <Text style={styles.doctorType}>
            {doctorCompleteData.education && doctorCompleteData.education.field}
          </Text>
          <Text style={styles.doctorReviews}>
            {doctorCompleteData.rating_score} ({doctorCompleteData.rating_count}{" "}
            review)
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
        <PrimaryButton
          style={{ marginVertical: 15 }}
          backgroundColor="#246BFD"
          color="#FFF"
          label="Book Appointment"
          onPress={() =>
            router.push({
              pathname: "./bookAppointment",
              params: {
                email: doctorData.email,
                question: doctorCompleteData.questions.join("&&&&"),
              },
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: blueColor, paddingTop: 20 },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: blueColor,
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
  doctorImage: {
    width: 100,
    height: 100,
    objectFit: "cover",
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
    marginBottom: 5,
    color: whiteText,
  },
  doctorName: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 3,
    color: whiteText,
  },
  doctorReviews: { fontSize: 13, color: whiteText },
  bottomCardText: {
    color: lightTextColor,
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 10,
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

export default doctorDetails;

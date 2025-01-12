import React, { use, useEffect, useState } from "react";
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
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  backgroundColor,
  blueColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import ErrorPage from "../../components/ErrorPage";
import Tab from "../../components/Tab";
import { usePatientProfile } from "../../context/PatientProfileProvider";
import { fetchPatientProfile } from "../../api/patient";
import { useLocalSearchParams } from "expo-router";

const index = () => {
  const { email } = useLocalSearchParams();
  const { patientProfile } = usePatientProfile();
  const [user, setUser] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = [
    { title: "Profile", index: 0 },
    { title: "Report", index: 1 },
  ];
  const location = {
    latitude: 25.3046288,
    longitude: 89.8544423,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const fetchPatientData = async () => {
    try {
      const response = await fetchPatientProfile(email);
      setUser({ ...response.data });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (patientProfile?.patient) {
      setUser(patientProfile.patient);
    } else {
      fetchPatientData();
    }
  }, [patientProfile]);

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return (
          <View>
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.bottomCardTitle}>Personal Details</Text>
              <View>
                {[
                  `Height: ${user.height} cm`,
                  `Weight: ${user.weight} kg`,
                  `Gender ${user.gender}`,
                  `Blood Group: ${user.bloodGroup}`,
                  `Date of Birth: ${new Date(user.dob).toLocaleDateString()}`,
                ].map((item, index) => (
                  <View style={styles.contactRow} key={index}>
                    <Text style={styles.bottomCardText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View>
              <Text style={styles.bottomCardTitle}>Contact Info</Text>
              <View>
                {[
                  { icon: "call", text: user.mobile },
                  { icon: "mail", text: user.email },
                  { icon: "location", text: user.address },
                ].map((item, index) => (
                  <View style={styles.contactRow} key={index}>
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={lightTextColor}
                    />
                    <Text style={[styles.bottomCardText, { marginLeft: 6 }]}>
                      {item.text}
                    </Text>
                  </View>
                ))}
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
                ></MapView>
              </View>
            </View>
          </View>
        );
      case 1:
        if (user.ehr.length === 0)
          return (
            <ErrorPage
              height={Dimensions.get("window").height}
              width={Dimensions.get("window").width}
              textContent="You don't have any report yet"
            />
          );
        return (
          <View>
            <Text style={styles.bottomCardTitle}>Prescription:</Text>
            <View>
              {user.ehr.map((item, index) => (
                <View key={index} style={styles.reportCard}>
                  <View style={{ gap: 3, justifyContent: "center" }}>
                    <Text style={styles.reportCardTitle}>
                      Report {index + 1} - {item.date}
                    </Text>
                    <Text style={styles.reportCardText}>
                      Provided by {item.name}
                    </Text>
                  </View>
                  <View style={styles.reportCardButton}>
                    <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                      <AntDesign name="download" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );
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
      <View style={styles.topContainer}>
        <View style={styles.topCard}>
          <View style={{ borderRadius: 15 }}>
            <Image
              style={styles.doctorImage}
              source={{
                uri: user.imageUrl
                  ? user.imageUrl
                  : "https://res.cloudinary.com/deohymauz/image/upload/v1704461039/user1_leoif6.png",
              }}
            />
          </View>
          <View style={styles.topCardRow}>
            <Text style={styles.doctorName}>{user.name}</Text>
            <Text style={styles.doctorType}>{user.city}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.tabContainer}>
            {tabs.map((tab) => (
              <Tab
                key={tab.index}
                title={tab.title}
                isActive={activeIndex === tab.index}
                onPress={() => setActiveIndex(tab.index)}
              />
            ))}
          </View>
          <ScrollView style={{ paddingTop: 20 }}>
            <View style={styles.renderContent}>{renderContent()}</View>
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
  bottomCardText: { color: lightTextColor, fontSize: 16, lineHeight: 22 },
  bottomCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: textBlack,
  },
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: backgroundColor,
    borderRadius: 25,
  },
  contactRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  reportCard: {
    marginVertical: 10,
    padding: 12,
    borderRadius: 15,
    backgroundColor: whiteText,
    borderWidth: 1,
    borderColor: borderColor,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reportCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: textBlack,
  },
  reportCardText: {
    fontSize: 13,
    fontWeight: "500",
    color: lightTextColor,
  },
  reportCardButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  renderContent: {
    paddingHorizontal: 5,
    marginBottom: 60,
  },
});

export default index;

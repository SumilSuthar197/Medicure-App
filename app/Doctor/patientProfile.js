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
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import {
  backgroundColor,
  blueColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import { backendUrl } from "../../constants/URL";
import axios from "axios";
import ErrorPage from "../../components/ErrorPage";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";

const patientPublicProfile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const item = useLocalSearchParams();
  const tabs = [
    { title: "Profile", index: 0 },
    { title: "Report", index: 1 },
  ];
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/patientprofiledoctor`,
          {
            email: item.email,
          }
        );
        setUser({ ...response.data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
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
                  <Text style={[styles.bottomCardText, { marginLeft: 8 }]}>
                    {user.mobile}
                  </Text>
                </View>
                <View style={styles.contactRow}>
                  <Ionicons name="md-mail" size={20} color={lightTextColor} />
                  <Text style={[styles.bottomCardText, { marginLeft: 8 }]}>
                    {user.email}
                  </Text>
                </View>
                <View style={styles.contactRow}>
                  <FontAwesome5
                    name="location-arrow"
                    size={18}
                    color={lightTextColor}
                  />
                  <Text style={[styles.bottomCardText, { marginLeft: 8 }]}>
                    {user.address}
                  </Text>
                </View>
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
                      Report {index + 1} -{" "}
                      {new Date(
                        item.date.split("-").reverse().join("-")
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                    <Text style={styles.reportCardText}>
                      Prescribed by Dr. {item.doctor_name}
                    </Text>
                  </View>
                  <View style={styles.reportCardButton}>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(item.prescription_url)}
                    >
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
      <StatusBar style="light" />
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
    width: "40%",
    borderRadius: 5,
  },
  inActiveTab: {
    borderRadius: 25,
    paddingVertical: 5,
    width: "30%",
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

export default patientPublicProfile;

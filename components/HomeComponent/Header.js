import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { borderColor, textBlack } from "../../constants/color";
import axios from "axios";

const Header = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        let response = await axios(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
        );
        if (response && response.data && response.data.address) {
          setAddress(response?.data?.address);
        }
      } catch (error) {
        console.log(error);
        setErrorMsg("Error fetching location data");
      }
    })();
  }, []);
  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (address) {
    text = [
      address?.neighbourhood,
      address?.suburb,
      address?.state_district,
      address?.state,
    ]
      .filter((item) => item)
      .join(", ");
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textTitle}>
            Location
          </Text>
          <View style={styles.textTitleContainer}>
            <Ionicons name="location" size={24} color={textBlack} />
            <Text
              style={styles.textTitle2}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {text}
            </Text>
          </View>
        </View>
        <View style={styles.notification}>
          <Ionicons name="notifications" size={24} color={textBlack} />
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/Patient/doctorSearch",
            params: { containCategory: "" },
          })
        }
      >
        <View style={styles.iconContainer}>
          <Ionicons name="search-outline" size={24} color={borderColor} />
          <TextInput
            editable={false}
            placeholder="Search a Doctor"
            placeholderTextColor="#cccdce"
            style={styles.inputText}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "relative",
    marginBottom: 10,
  },
  subContainer: { width: "70%" },
  textTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 3,
    marginLeft: 3,
    color: textBlack,
  },
  textTitleContainer: { flexDirection: "row", alignItems: "center" },
  textTitle2: {
    width: "100%",
    fontSize: 14,
    color: textBlack,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: borderColor,
    backgroundColor: "#FFF",
    padding: 5,
    borderRadius: 15,
  },
  inputText: { width: "100%", color: borderColor },
  notification: {
    backgroundColor: "#E5E5E5",
    borderRadius: 75,
    aspectRatio: 1,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 5,
    top: 3,
  },
});

export default Header;

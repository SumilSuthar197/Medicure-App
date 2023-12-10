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

const Header = () => {
  const [location, setLocation] = useState(null);
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
        setLocation(location);
        // console.log(location);
        // Reverse geocoding to get the address from coordinates
        let addressResult = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (addressResult.length > 0) {
          setAddress({
            street: addressResult[0].street || "Unknown Street",
            city: addressResult[0].city || "Unknown City",
          });
        }
      } catch (error) {
        setErrorMsg("Error fetching location data");
      }
    })();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (address) {
    text = `${address.street}, ${address.city}`;
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          position: "relative",
          marginBottom: 10,
        }}
      >
        <View style={{ width: "70%" }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textTitle}>
            Location
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="location" size={24} color="black" />
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
          <Ionicons name="notifications" size={24} color="black" />
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push("/Patient/DoctorSearch")}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            borderWidth: 0.7,
            borderColor: "#777777",
            padding: 5,
            borderRadius: 8,
          }}
        >
          <Ionicons name="search-outline" size={24} color="black" />
          <TextInput
            editable={false}
            placeholder="search"
            //   onChangeText={(value) => {
            //     setSearchValue(Value);
            //   }}
            //   onSubmitEditing={(value) => {
            //     setSearchValue(Value);
            //   }}

            style={{ width: "100%" }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    fontFamily: "Poppins-Regular",
  },
  form: {
    flex: 2,
    paddingHorizontal: 15,
    rowGap: 20,
  },
  textTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 3,
    marginLeft: 3,
  },
  textContainer: {
    fontSize: 14,
    fontWeight: "500",
    // color: "#000",
    paddingLeft: 12,
    paddingRight: 12,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F5F7F8",
    width: "100%",
    marginHorizontal: "auto",
  },
  textTitle2: {
    width: "100%",
    fontSize: 14,
    color: "black",
  },
  itemText: {
    textAlign: "center",
    marginHorizontal: 35,
    color: "black",
    lineHeight: 22,
    fontSize: 18,
    paddingHorizontal: 15,
  },
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

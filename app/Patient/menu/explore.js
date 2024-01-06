import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { backendUrl } from "../../../constants/URL";
import {
  borderColor,
  lightBlueColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../../constants/color";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const MapObject = (data) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/Patient/doctorDetails",
          params: {
            email: data.email,
            rating: 4.7,
            count: 0,
          },
        });
      }}
    >
      <View
        style={{
          marginTop: 20,
          padding: 12,
          borderRadius: 15,
          backgroundColor: whiteText,
          borderWidth: 1,
          borderColor: borderColor,
        }}
      >
        <View style={{ flexDirection: "row", gap: 20 }}>
          <View>
            <Image
              style={{
                width: 50,
                height: 50,
                objectFit: "fill",
                borderRadius: 99,
              }}
              source={{
                uri: data.image
                  ? data.image
                  : "https://res.cloudinary.com/deohymauz/image/upload/v1704545467/demoDoctor_hkhmdp.jpg",
              }}
            />
          </View>
          <View style={{ gap: 3, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: textBlack,
              }}
            >
              {data.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: lightTextColor,
              }}
            >
              {data.education.field}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 8,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: lightTextColor,
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              4.7 (573 review)
            </Text>
          </View>
          <Text style={{ color: lightBlueColor }}>|</Text>
          <Text
            style={{
              color: lightTextColor,
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            {data.experience} years experience
          </Text>
          <Text style={{ color: lightBlueColor }}>|</Text>
          <Text
            style={{
              color: lightTextColor,
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            {data.hospital.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Explore = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      try {
        const response = await axios.post(`${backendUrl}/emergency`, {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    })();
  }, []);

  const handleMarkerPress = (coordinate) => {
    setSelectedCoordinate(coordinate);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      {location && (
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          showsMyLocationButton
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {doctors.map((doctor, index) => (
            <Marker
              key={index}
              coordinate={doctor.location}
              onPress={() => handleMarkerPress(doctor.location)}
            >
              <Callout>
                {
                  <View>
                    <Text>{doctor.name}</Text>
                  </View>
                }
              </Callout>
            </Marker>
          ))}
          {selectedCoordinate && (
            <Marker
              coordinate={selectedCoordinate}
              pinColor="red"
              title="Selected Marker"
            />
          )}
        </MapView>
      )}
      {selectedCoordinate && (
        <View
          style={{
            backgroundColor: "transparent",
            padding: 20,
            position: "absolute",
            bottom: 0,
            width: "100%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          {doctors
            .filter((doctor) => {
              const { latitude, longitude } = selectedCoordinate;
              return (
                doctor.location.latitude === latitude &&
                doctor.location.longitude === longitude
              );
            })
            .map((doctor, index) => (
              <MapObject key={index} {...doctor} />
            ))}
        </View>
      )}
    </SafeAreaView>
  );
};
export default Explore;

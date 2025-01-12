import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { getNearByDoctors } from "../../../api/patient";

const MapObject = (data) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/Patient/doctorDetails",
          params: {
            email: data.email,
          },
        });
      }}
    >
      <View style={styles.mapObjectContainer}>
        <View style={styles.mapObjectHeader}>
          <Image
            style={styles.doctorImage}
            source={{
              uri: data.image,
            }}
          />
          <View style={styles.doctorInfoContainer}>
            <Text style={styles.doctorName}>{data.name}</Text>
            <Text style={styles.doctorField}>{data.field}</Text>
          </View>
        </View>
        <View style={styles.mapObjectDetails}>
          <Text style={styles.detailText}>
            {data.rating_score} ({data.rating_count} review)
          </Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.detailText}>
            {data.experience} years experience
          </Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.detailText}>{data.city}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Explore = () => {
  const [location, setLocation] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Location permission is required to view nearby doctors"
        );
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      try {
        const response = await getNearByDoctors(
          currentLocation?.coords?.latitude,
          currentLocation?.coords?.longitude
        );

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
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {location && (
        <MapView
          style={styles.map}
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
                <View>
                  <Text>{doctor.name}</Text>
                </View>
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
        <View style={styles.bottomPanel}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomPanel: {
    backgroundColor: "transparent",
    padding: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  mapObjectContainer: {
    marginTop: 20,
    padding: 12,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  mapObjectHeader: {
    flexDirection: "row",
    gap: 20,
  },
  doctorImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 99,
  },
  doctorInfoContainer: {
    gap: 3,
    justifyContent: "center",
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  doctorField: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888",
  },
  mapObjectDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 12,
  },
  detailText: {
    color: "#888",
    fontSize: 12,
    fontWeight: "500",
  },
  separator: {
    color: "#888",
  },
});

export default Explore;

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { lightTextColor, textBlack } from "../../constants/color";

const Contact = ({ mobile, email, location, coordinate }) => {
  return (
    <View>
      <Text style={styles.bottomCardTitle}>Contact Info</Text>
      <View style={styles.contactRow}>
        <Ionicons name="call" size={18} color={lightTextColor} />
        <Text style={styles.bottomCardText}>{mobile}</Text>
      </View>
      <View style={styles.contactRow}>
        <Ionicons name="mail" size={18} color={lightTextColor} />
        <Text style={styles.bottomCardText}>{email}</Text>
      </View>
      <View style={styles.contactRow}>
        <FontAwesome5 name="location-arrow" size={16} color={lightTextColor} />
        <Text style={styles.bottomCardText}>
          {location}
        </Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={{ flex: 1, height: 200 }}
          initialRegion={{
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          provider={PROVIDER_GOOGLE}
        >
          <Marker
            coordinate={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            }}
            title="Doctor's Location"
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomCardText: {
    color: lightTextColor,
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 8,
  },
  bottomCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: textBlack,
  },
  mapContainer: { borderRadius: 25, overflow: "hidden", marginTop: 20 },
  contactRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
});
export default Contact;

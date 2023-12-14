import React, { useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";

const explore = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const jwtToken = await AsyncStorage.getItem("userInfo");
  //       console.log(jwtToken);
  //       const response = await axios.get(
  //         "https://medicure-avi420-69.koyeb.app/getdoctors",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${jwtToken}`,
  //           },
  //         }
  //       );

  //       console.log(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <MapView
        style={{ flex: 1 }}
        // initialRegion={location}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
      >
        {/* <Marker coordinate={location} title="Your Location" /> */}
      </MapView>
    </View>
  );
};

export default explore;

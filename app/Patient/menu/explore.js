// // // import React, { useEffect, useState } from "react";
// // // import { View, Text } from "react-native";
// // // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // import axios from "axios";
// // // import MapView, {
// // //   Callout,
// // //   Marker,
// // //   PROVIDER_GOOGLE,
// // //   Region,
// // // } from "react-native-maps";

// // // import * as Location from "expo-location";

// // // const Explore = () => {
// // //   const [location, setLocation] = useState(null);
// // //   const [errorMsg, setErrorMsg] = useState(null);

// // //   useEffect(() => {
// // //     (async () => {
// // //       let { status } = await Location.requestForegroundPermissionsAsync();
// // //       if (status !== "granted") {
// // //         setErrorMsg("Permission to access location was denied");
// // //         return;
// // //       }

// // //       let location = await Location.getCurrentPositionAsync({});
// // //       setLocation(location);
// // //       console.log(location);
// // //     })();
// // //   }, []);

// // //   let text = "Waiting..";
// // //   if (errorMsg) {
// // //     text = errorMsg;
// // //   } else if (location) {
// // //     text = JSON.stringify(location);
// // //   }

// // //   return (
// // //     <View style={{ flex: 1, paddingTop: 30 }}>
// // //       {location && (
// // //         <MapView
// // //           style={{ flex: 1 }}
// // //           provider={PROVIDER_GOOGLE}
// // //           showsUserLocation
// // //           showsMyLocationButton
// // //           initialRegion={location.coords}
// // //         >
// // //           <Marker
// // //             coordinate={{
// // //               latitude: location.coords.latitude,
// // //               longitude: location.coords.longitude,
// // //             }}
// // //           />
// // //         </MapView>
// // //       )}
// // //     </View>
// // //   );
// // // };

// // // export default Explore;
// // import React, { useEffect, useState } from "react";
// // import { View, Text, ScrollView, TouchableOpacity } from "react-native";
// // import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";

// // import * as Location from "expo-location";

// // const Explore = () => {
// //   const [location, setLocation] = useState(null);
// //   const [errorMsg, setErrorMsg] = useState(null);
// //   const [randomCoordinates, setRandomCoordinates] = useState([]);
// //   const [selectedCoordinate, setSelectedCoordinate] = useState(null);

// //   useEffect(() => {
// //     (async () => {
// //       let { status } = await Location.requestForegroundPermissionsAsync();
// //       if (status !== "granted") {
// //         setErrorMsg("Permission to access location was denied");
// //         return;
// //       }

// //       let currentLocation = await Location.getCurrentPositionAsync({});
// //       setLocation(currentLocation);

// //       // Generate 5 random coordinates for demonstration
// //       const newRandomCoordinates = Array.from({ length: 5 }).map(() => ({
// //         latitude:
// //           currentLocation.coords.latitude + (Math.random() * 0.1 - 0.05),
// //         longitude:
// //           currentLocation.coords.longitude + (Math.random() * 0.1 - 0.05),
// //       }));

// //       setRandomCoordinates(newRandomCoordinates);
// //     })();
// //   }, []);

// //   const handleMarkerPress = (coordinate) => {
// //     setSelectedCoordinate(coordinate);
// //   };

// //   const handleCardPress = (coordinate) => {
// //     setSelectedCoordinate(coordinate);
// //   };

// //   return (
// //     <View style={{ flex: 1, paddingTop: 30 }}>
// //       <ScrollView horizontal>
// //         {randomCoordinates.map((coordinate, index) => (
// //           <TouchableOpacity
// //             key={index}
// //             style={{
// //               backgroundColor:
// //                 selectedCoordinate === coordinate ? "lightblue" : "#fff",
// //               padding: 20,
// //               margin: 10,
// //               borderRadius: 10,
// //             }}
// //             onPress={() => handleCardPress(coordinate)}
// //           >
// //             <Text>{`Latitude: ${coordinate.latitude.toFixed(6)}`}</Text>
// //             <Text>{`Longitude: ${coordinate.longitude.toFixed(6)}`}</Text>
// //           </TouchableOpacity>
// //         ))}
// //       </ScrollView>

// //       {location && (
// //         <MapView
// //           style={{ flex: 1 }}
// //           provider={PROVIDER_GOOGLE}
// //           showsUserLocation
// //           showsMyLocationButton
// //           initialRegion={{
// //             latitude: location.coords.latitude,
// //             longitude: location.coords.longitude,
// //             latitudeDelta: 0.1,
// //             longitudeDelta: 0.1,
// //           }}
// //         >
// //           {randomCoordinates.map((coordinate, index) => (
// //             <Marker
// //               key={index}
// //               coordinate={coordinate}
// //               onPress={() => handleMarkerPress(coordinate)}
// //             >
// //               <Callout>{/* You can add additional information here */}</Callout>
// //             </Marker>
// //           ))}
// //           {selectedCoordinate && (
// //             <Marker
// //               coordinate={selectedCoordinate}
// //               pinColor="red"
// //               title="Selected Marker"
// //             />
// //           )}
// //         </MapView>
// //       )}
// //     </View>
// //   );
// // };

// // export default Explore;
// import React, { useEffect, useState, useRef } from "react";
// import { View, Text, ScrollView, TouchableOpacity } from "react-native";
// import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";

// import * as Location from "expo-location";

// const Explore = () => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [randomCoordinates, setRandomCoordinates] = useState([]);
//   const [selectedCoordinate, setSelectedCoordinate] = useState(null);
//   const scrollViewRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }

//       let currentLocation = await Location.getCurrentPositionAsync({});
//       setLocation(currentLocation);

//       // Generate 5 random coordinates for demonstration
//       const newRandomCoordinates = Array.from({ length: 5 }).map(() => ({
//         latitude:
//           currentLocation.coords.latitude + (Math.random() * 0.1 - 0.05),
//         longitude:
//           currentLocation.coords.longitude + (Math.random() * 0.1 - 0.05),
//       }));

//       setRandomCoordinates(newRandomCoordinates);
//     })();
//   }, []);

//   const handleMarkerPress = (coordinate) => {
//     setSelectedCoordinate(coordinate);
//     // Scroll to the selected card
//     scrollViewRef.current.scrollTo({
//       x:
//         randomCoordinates.findIndex(
//           (coord) =>
//             coord.latitude === coordinate.latitude &&
//             coord.longitude === coordinate.longitude
//         ) * 150, // Adjust this value based on your card width
//       animated: true,
//     });
//   };

//   const handleCardPress = (coordinate) => {
//     setSelectedCoordinate(coordinate);
//     // Scroll to the selected card
//     scrollViewRef.current.scrollTo({
//       x:
//         randomCoordinates.findIndex(
//           (coord) =>
//             coord.latitude === coordinate.latitude &&
//             coord.longitude === coordinate.longitude
//         ) * 150, // Adjust this value based on your card width
//       animated: true,
//     });
//   };

//   return (
//     <View style={{ flex: 1, paddingTop: 30 }}>
//       <ScrollView
//         horizontal
//         ref={scrollViewRef}
//         showsHorizontalScrollIndicator={false}
//       >
//         {randomCoordinates.map((coordinate, index) => (
//           <TouchableOpacity
//             key={index}
//             style={{
//               backgroundColor:
//                 selectedCoordinate === coordinate ? "lightblue" : "#fff",
//               padding: 20,
//               margin: 10,
//               borderRadius: 10,
//             }}
//             onPress={() => handleCardPress(coordinate)}
//           >
//             <Text>{`Latitude: ${coordinate.latitude.toFixed(6)}`}</Text>
//             <Text>{`Longitude: ${coordinate.longitude.toFixed(6)}`}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {location && (
//         <MapView
//           style={{ flex: 1 }}
//           provider={PROVIDER_GOOGLE}
//           showsUserLocation
//           showsMyLocationButton
//           initialRegion={{
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude,
//             latitudeDelta: 0.1,
//             longitudeDelta: 0.1,
//           }}
//         >
//           {randomCoordinates.map((coordinate, index) => (
//             <Marker
//               key={index}
//               coordinate={coordinate}
//               onPress={() => handleMarkerPress(coordinate)}
//             >
//               <Callout>{/* You can add additional information here */}</Callout>
//             </Marker>
//           ))}
//           {selectedCoordinate && (
//             <Marker
//               coordinate={selectedCoordinate}
//               pinColor="red"
//               title="Selected Marker"
//             />
//           )}
//         </MapView>
//       )}
//     </View>
//   );
// };

// export default Explore;
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";

import * as Location from "expo-location";
import {
  borderColor,
  lightBlueColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../../constants/color";

const Explore = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [randomCoordinates, setRandomCoordinates] = useState([]);
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

      // Generate 5 random coordinates for demonstration
      const newRandomCoordinates = Array.from({ length: 5 }).map(() => ({
        latitude:
          currentLocation.coords.latitude + (Math.random() * 0.1 - 0.05),
        longitude:
          currentLocation.coords.longitude + (Math.random() * 0.1 - 0.05),
      }));

      setRandomCoordinates(newRandomCoordinates);
    })();
  }, []);

  const handleMarkerPress = (coordinate) => {
    setSelectedCoordinate(coordinate);
  };

  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
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
          {randomCoordinates.map((coordinate, index) => (
            <Marker
              key={index}
              coordinate={coordinate}
              onPress={() => handleMarkerPress(coordinate)}
            >
              <Callout>{/* You can add additional information here */}</Callout>
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
          <TouchableOpacity
          // onPress={() => {
          //   router.push("/Patient/doctorDetails");
          // }}
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
                    source={require("../../../assets/images/Image.png")}
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
                    Dr Sarthak Tanpure
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: lightTextColor,
                    }}
                  >
                    Dentist
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
                  {/* <AntDesign name="star" size={12} color="yellow" /> */}
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
                  21 years experience
                </Text>
                <Text style={{ color: lightBlueColor }}>|</Text>
                <Text
                  style={{
                    color: lightTextColor,
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                >
                  100 patients
                </Text>
              </View>
              {/* <TouchableOpacity
            style={{
              backgroundColor: "#dbeafe",
              paddingHorizontal: 32,
              height: 45,
              borderRadius: 15,
              marginTop: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              router.push("/Patient/doctorDetails");
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500", color: "#246BFD" }}>
              Make Appointment
            </Text>
          </TouchableOpacity> */}
            </View>
          </TouchableOpacity>
          {/* <Text>{`Latitude: ${selectedCoordinate.latitude.toFixed(6)}`}</Text>
          <Text>{`Longitude: ${selectedCoordinate.longitude.toFixed(6)}`}</Text> */}
        </View>
      )}
    </View>
  );
};

export default Explore;

// import React from "react";
// import { useState, useEffect, useRef } from "react";
// import { Text, View, Button, Platform } from "react-native";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { backendUrl } from "../../../constants/URL";
import axios from "axios";
import PrimaryButton from "../../../components/PrimaryButton";
import {
  borderColor,
  lightTextColor,
  whiteText,
  textBlack,
  backgroundColor,
} from "../../../constants/color";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  //   const [expoPushToken, setExpoPushToken] = useState("");
  //   const [notification, setNotification] = useState(false);
  //   const notificationListener = useRef();
  //   const responseListener = useRef();

  //   useEffect(() => {
  //     registerForPushNotificationsAsync().then((token) =>
  //       setExpoPushToken(token)
  //     );

  //     notificationListener.current =
  //       Notifications.addNotificationReceivedListener((notification) => {
  //         setNotification(notification);
  //       });

  //     responseListener.current =
  //       Notifications.addNotificationResponseReceivedListener((response) => {
  //         console.log(response);
  //       });

  //     return () => {
  //       Notifications.removeNotificationSubscription(
  //         notificationListener.current
  //       );
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //     };
  //   }, []);

  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         alignItems: "center",
  //         justifyContent: "space-around",
  //       }}
  //     >
  //       <Text>Your expo push token: {expoPushToken}</Text>
  //       <View style={{ alignItems: "center", justifyContent: "center" }}>
  //         <Text>
  //           Title: {notification && notification.request.content.title}{" "}
  //         </Text>
  //         <Text>Body: {notification && notification.request.content.body}</Text>
  //         <Text>
  //           Data:{" "}
  //           {notification && JSON.stringify(notification.request.content.data)}
  //         </Text>
  //       </View>
  //       <Button
  //         title="Press to schedule a notification"
  //         onPress={async () => {
  //           await schedulePushNotification();
  //         }}
  //       />
  //     </View>
  //   );
  // };

  // async function schedulePushNotification() {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "You've got mail! 📬",
  //       body: "Here is the notification body",
  //       data: { data: "goes here" },
  //     },
  //     trigger: { seconds: 2 },
  //   });
  // }

  // async function registerForPushNotificationsAsync() {
  //   let token;

  //   if (Platform.OS === "android") {
  //     await Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   if (Device.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   return token;
  // }

  const [user, setUser] = useState({
    start_date: "",
    end_date: "",
    reason: "",
    hospital_name: "",
  });

  const handleSubmit = async () => {
    try {
      // console.log(leave);
      const storedItem = await AsyncStorage.getItem("doctorInfo");
      const jwtToken = JSON.parse(storedItem);
      const response = await axios.post(`${backendUrl}/applyleave`, user, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log(response);

      if (response.data) {
        console.log("Leave applied successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 30, gap: 20 }}>
        <View>
          <Text style={styles.textTitle}>Your leaves start from?</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            // numberOfLines={4}
            value={user.start_date}
            style={styles.textContainer}
            onChangeText={(text) => setUser({ ...user, start_date: text })}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Your leaves end when?</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            // numberOfLines={4}
            value={user.end_date}
            style={styles.textContainer}
            onChangeText={(text) => setUser({ ...user, end_date: text })}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Hospital Name</Text>
          <TextInput
            placeholder="Enter your hospital name"
            value={user.hospital_name}
            style={styles.textContainer}
            onChangeText={(text) => setUser({ ...user, hospital_name: text })}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Application</Text>
          <TextInput
            placeholder="Write your reason for leave"
            numberOfLines={8}
            value={user.reason}
            style={styles.textContainer2}
            onChangeText={(text) => setUser({ ...user, reason: text })}
          />
        </View>
        <PrimaryButton
          backgroundColor="#000"
          color="#FFF"
          label="Submit Leave"
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    fontFamily: "Poppins-Regular",
    paddingHorizontal: 15,
    // gap: 20,
    paddingTop: 15,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    marginLeft: 3,
    color: textBlack,
  },
  textContainer: {
    fontSize: 15,
    fontWeight: "500",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: whiteText,
    borderColor: borderColor,
    borderWidth: 1,
    color: lightTextColor,
    textDecorationLine: "none",
    width: "100%",
    marginHorizontal: "auto",
  },
  textContainer2: {
    textAlignVertical: "top",
    fontSize: 14,
    fontWeight: "500",
    padding: 12,
    borderRadius: 12,
    backgroundColor: whiteText,
    borderColor: borderColor,
    borderWidth: 1,
    color: lightTextColor,
    textDecorationLine: "none",
    width: "100%",
    marginHorizontal: "auto",
  },
});

export default index;

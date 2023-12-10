import React, { useEffect } from "react";
import { View, Text, Button, Linking } from "react-native";
import * as Notifications from "expo-notifications";
import axios from "axios";

export default function Notification() {
  useEffect(() => {
    registerForPushNotifications();

    // Handle incoming notifications
    const subscription =
      Notifications.addNotificationReceivedListener(handleNotification);

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.remove();
    };
  }, []);

  const checkAndUpdatePushToken = async () => {
    try {
      const storedToken = "..."; // Retrieve the stored token from your server or local storage
      const expirationThreshold = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds

      if (!storedToken || isTokenExpired(storedToken, expirationThreshold)) {
        const { data } = await Notifications.getExpoPushTokenAsync();
        const newToken = data;

        // Update the token on your server
        await updateTokenOnServer(newToken);

        // Use the new token for sending notifications
        console.log("New Expo push token:", newToken);
      } else {
        // Use the stored token for sending notifications
        console.log("Using stored Expo push token:", storedToken);
      }
    } catch (error) {
      console.error("Error checking or updating push token:", error);
    }
  };

  const isTokenExpired = (token, expirationThreshold) => {
    const now = new Date().getTime();
    const tokenTimestamp = new Date(token.createdAt).getTime(); // Assuming your token object has a 'createdAt' property

    return now - tokenTimestamp > expirationThreshold;
  };

  const updateTokenOnServer = async (newToken) => {
    // Update the token on your server
    await axios.post("YOUR_BACKEND_API_URL/update_token", { token: newToken });
  };

  const registerForPushNotifications = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to receive push notifications denied!");
        return;
      }

      const expoPushToken = (await Notifications.getExpoPushTokenAsync()).data;

      // Replace 'USER_ID' with the actual user identifier from your authentication system
      const userId = "USER_ID";

      // Send the expoPushToken and userId to your backend for registration
      await axios.post("YOUR_FLASK_BACKEND_URL/register", {
        user_id: userId,
        expo_token: expoPushToken,
      });

      console.log(
        "User registered successfully with Expo push token:",
        expoPushToken
      );
    } catch (error) {
      console.error("Error registering for push notifications:", error);
    }
  };

  const sendPushNotification = async () => {
    try {
      // Replace 'USER_ID' with the actual user identifier
      const userId = "USER_ID";

      // Replace 'YOUR_FLASK_BACKEND_URL' with the actual URL where your Flask server is running
      const response = await axios.post(
        "YOUR_FLASK_BACKEND_URL/send_notification",
        {
          user_id: userId,
          title: "Notification Title",
          body: "Notification Body",
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  };

  const handleNotification = (notification) => {
    // Handle incoming notifications here
    console.log(notification);

    // Extract any additional data from the notification
    const { data } = notification.request.content;

    // Check if there's a URL in the notification data
    if (data && data.url) {
      // Open the URL when the notification is clicked
      Linking.openURL(data.url);
    }
  };

  return (
    <View>
      <Text>Push Notifications Example</Text>
      <Button title="Send Notification" onPress={sendPushNotification} />
    </View>
  );
}

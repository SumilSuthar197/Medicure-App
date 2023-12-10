import * as Notifications from "expo-notifications";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const sendNotification = async () => {
  try {
    const storedToken = await AsyncStorage.getItem("token");
    const expirationThreshold = 10 * 24 * 60 * 60 * 1000;

    let expoPushToken;

    if (!storedToken || isTokenExpired(storedToken, expirationThreshold)) {
      const { data } = await Notifications.getExpoPushTokenAsync();
      expoPushToken = data;

      await updateTokenOnServer(expoPushToken);
      console.log("New Expo push token");
    } else {
      expoPushToken = storedToken;
      console.log("Stored Expo token used");
    }

    // const response = await axios.post(
    //   "YOUR_FLASK_BACKEND_URL/send_notification",
    //   {
    //     user_id: userId,
    //     title: "Notification Title",
    //     body: "Notification Body",
    //   }
    // );

    // console.log(response.data);
  } catch (error) {
    console.error("Error handling push notification:", error);
  }
};

export const isTokenExpired = (token, expirationThreshold) => {
  const now = new Date().getTime();
  const tokenTimestamp = new Date(token.createdAt).getTime();

  return now - tokenTimestamp > expirationThreshold;
};

export const updateTokenOnServer = async (newToken) => {
  const userId = await AsyncStorage.getItem("token");
  await axios.post(`YOUR_BACKEND_API_URL/${userId}`, { token: newToken });
};

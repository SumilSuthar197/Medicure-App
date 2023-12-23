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
  const [user, setUser] = useState({
    start_date: "",
    end_date: "",
    reason: "",
    hospital_name: "",
  });

  const handleSubmit = async () => {
    try {
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
            value={user.start_date}
            style={styles.textContainer}
            onChangeText={(text) => setUser({ ...user, start_date: text })}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Your leaves end when?</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
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

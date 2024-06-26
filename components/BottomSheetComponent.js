import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import PrimaryButton from "./PrimaryButton";
import {
  blueColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../constants/color";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomSheetComponent = ({
  appointId,
  emailPat,
  onClosePress,
  onLogoutPress,
}) => {
  const [data, setData] = useState({
    paragraph: "",
    advisory: "",
  });

  const handleSubmit = async () => {
    try {
      const storedItem = await AsyncStorage.getItem("doctorInfo");
      const jwtToken = JSON.parse(storedItem);
      const response = await axios.post(
        `https://medicure-sumilsuthar197.koyeb.app/submit_review`,
        {
          patient_email: emailPat,
          appointment_id: appointId,
          advisory_text: data.advisory,
          prescription_text: data.paragraph,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      onClosePress();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.main}>
      <Text style={styles.navText}>Prescription and Advisory</Text>
      <ScrollView>
        <View>
          <Text style={styles.textTitle}>Medication</Text>
          <TextInput
            multiline
            numberOfLines={7}
            textAlignVertical="top"
            placeholder="Write each medication on new line"
            value={data.paragraph}
            onChangeText={(text) => setData({ ...data, paragraph: text })}
            style={styles.textContainer}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.textTitle}>Advisory</Text>
          <TextInput
            multiline
            numberOfLines={7}
            textAlignVertical="top"
            placeholder="Write each medication on new line"
            value={data.advisory}
            onChangeText={(text) => setData({ ...data, advisory: text })}
            style={styles.textContainer}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          backgroundColor={blueColor}
          label="Cancel"
          style={styles.button}
          onPress={onClosePress}
          color="#FFF"
        />
        <PrimaryButton
          backgroundColor={blueColor}
          label="Complete"
          style={styles.button}
          onPress={handleSubmit}
          color="#FFF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: whiteText, paddingHorizontal: 20 },
  navText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: textBlack,
    paddingBottom: 20,
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    gap: 15,
  },
  button: {
    width: "47%",
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: textBlack,
    marginBottom: 3,
    marginLeft: 3,
  },
  textContainer: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#F5F7F8",
    color: lightTextColor,
    textDecorationLine: "none",
    width: "100%",
    marginHorizontal: "auto",
  },
});

export default BottomSheetComponent;

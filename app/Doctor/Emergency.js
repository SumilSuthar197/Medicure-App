import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import {
  backgroundColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import PrimaryButton from "../../components/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backendUrl } from "../../constants/URL";
import axios from "axios";

const Emergency = () => {
  const [hours, setHours] = useState("");

  const handleSubmit = async () => {
    try {
      const storedItem = await AsyncStorage.getItem("doctorEmail");
      //   const jwtToken = JSON.parse(storedItem);
      const response = await axios.post(`${backendUrl}/doctor_emergency`, {
        email: storedItem,
        minutes: parseInt(hours) * 60,
      });
      Alert.alert(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        paddingHorizontal: 15,
        paddingVertical: 20,
      }}
    >
      <View>
        <Text style={styles.textTitle}>
          Time you are not available for in hours
        </Text>
        <TouchableOpacity style={styles.textPicker}>
          <Picker
            mode={"dialog"}
            style={styles.textPicker}
            itemStyle={{ fontSize: 14, fontWeight: "600" }}
            selectedValue={hours}
            onValueChange={(itemValue) => setHours(itemValue)}
          >
            <Picker.Item label="Select Hours" value="" />
            <Picker.Item label="2 hrs" value="2" />
            <Picker.Item label="4 hrs" value="4" />
            <Picker.Item label="6 hrs" value="6" />
            <Picker.Item label="8 hrs" value="8" />
            <Picker.Item label="10 hrs" value="10" />
            <Picker.Item label="full day" value="24" />
          </Picker>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View style={{ alignContent: "center", marginTop: 6 }}>
          <FontAwesome name="circle" size={10} color="black" />
        </View>
        <Text style={[styles.textTitle]}>
          All of the patients in the above time slot will be notified that you
          are not present to treat them currently
        </Text>
      </View>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View style={{ alignContent: "center", marginTop: 6 }}>
          <FontAwesome name="circle" size={10} color="black" />
        </View>
        <Text style={[styles.textTitle]}>
          Note that all of the appointments in the above mentioned time frame
          would either be cancelled according to the patient
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <PrimaryButton
          backgroundColor="#000"
          color="#FFF"
          label="Submit"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    fontFamily: "Poppins-Regular",
  },
  form: {
    flex: 2,
    paddingHorizontal: 15,
    rowGap: 20,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    marginLeft: 3,
    color: textBlack,
  },
  textContainer: {
    fontSize: 14,
    fontWeight: "500",
    paddingLeft: 12,
    paddingRight: 12,
    height: 48,
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
  textPicker: {
    fontSize: 14,
    fontWeight: "600",
    overflow: "hidden",
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: whiteText,
    borderColor: borderColor,
    borderWidth: 1,
    color: lightTextColor,
    textDecorationLine: "none",
    width: "100%",
    marginHorizontal: "auto",
  },
  itemTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 5,
    color: "black",
    paddingHorizontal: 15,
  },
  itemText: {
    textAlign: "center",
    marginHorizontal: 35,
    color: "black",
    lineHeight: 22,
    fontSize: 14,
    paddingHorizontal: 15,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 20,
  },
});

export default Emergency;

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import {
  backgroundColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import PrimaryButton from "../../components/PrimaryButton";
import { submitEmergencyRequest } from "../../api/doctor";

const Emergency = () => {
  const [hours, setHours] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (hours === "") {
      Alert.alert("Missing Fields", "Please select the hours.");
      return;
    }
    try {
      setLoading(true);
      const minutes = parseInt(hours) * 60;
      await submitEmergencyRequest(minutes);
      Alert.alert(
        "Emergency Request Submitted",
        "Your emergency request has been successfully submitted."
      );
    } catch (error) {
      Alert.alert(
        "Emergency Request Failed",
        "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.main}>
      <View style={{ marginBottom: 15 }}>
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
            {[2, 4, 6, 8, 10, 24].map((item) => (
              <Picker.Item key={item} label={`${item} hrs`} value={item} />
            ))}
          </Picker>
        </TouchableOpacity>
      </View>
      <View style={styles.instructions}>
        <View style={styles.icon}>
          <FontAwesome name="circle" size={8} color="black" />
        </View>
        <Text style={styles.textTitle}>
          All of the patients in the above time slot will be notified that you
          are not present to treat them currently
        </Text>
      </View>
      <View style={styles.instructions}>
        <View style={styles.icon}>
          <FontAwesome name="circle" size={8} color="black" />
        </View>
        <Text style={styles.textTitle}>
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
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: backgroundColor,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    marginLeft: 3,
    color: textBlack,
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
  instructions: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  icon: { alignContent: "center", marginTop: 7, marginRight: 3 },
});

export default Emergency;

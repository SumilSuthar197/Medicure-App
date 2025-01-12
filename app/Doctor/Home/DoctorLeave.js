import { View, Text, StyleSheet, Alert, TextInput } from "react-native";
import React, { useState } from "react";
import PrimaryButton from "../../../components/PrimaryButton";
import {
  borderColor,
  lightTextColor,
  whiteText,
  textBlack,
  backgroundColor,
} from "../../../constants/color";
import { submitLeaveRequest } from "../../../api/doctor";

const isValidDate = (date) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(date)) return false;
  const [year, month, day] = date.split("-").map(Number);
  if (month < 1 || month > 12) return false;
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return false;
  return true;
};
const DoctorLeave = () => {
  const [leaveDetails, setLeaveDetails] = useState({
    start_date: "",
    end_date: "",
    reason: "",
    hospital_name: "",
  });
  const handleSubmit = async () => {
    try {
      const { start_date, end_date, hospital_name, reason } = leaveDetails;
      if (!start_date || !end_date || !hospital_name || !reason) {
        Alert.alert("Missing Fields", "Please fill all the fields to proceed.");
        return;
      }
      if (!isValidDate(start_date) || !isValidDate(end_date)) {
        Alert.alert(
          "Invalid Date",
          "Please enter a valid date in YYYY-MM-DD format."
        );
        return;
      }

      const response = await submitLeaveRequest(leaveDetails);
      if (response.data.output === true) {
        Alert.alert(
          "Success",
          "Your leave application has been successfully submitted and is awaiting approval."
        );
        setLeaveDetails({
          start_date: "",
          end_date: "",
          reason: "",
          hospital_name: "",
        });
      }
    } catch (error) {
      Alert.alert(
        "Leave Application Failed",
        "Something went wrong. Please try again later."
      );
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textTitle}>Your leaves start from?</Text>
        <TextInput
          placeholder="YYYY-MM-DD"
          value={leaveDetails.start_date}
          style={styles.textContainer}
          onChangeText={(text) =>
            setLeaveDetails((prev) => ({ ...prev, start_date: text }))
          }
        />
      </View>
      <View>
        <Text style={styles.textTitle}>Your leaves end when?</Text>
        <TextInput
          placeholder="YYYY-MM-DD"
          value={leaveDetails.end_date}
          style={styles.textContainer}
          onChangeText={(text) =>
            setLeaveDetails((prev) => ({ ...prev, end_date: text }))
          }
        />
      </View>
      <View>
        <Text style={styles.textTitle}>Hospital Name</Text>
        <TextInput
          placeholder="Enter your hospital name"
          value={leaveDetails.hospital_name}
          style={styles.textContainer}
          onChangeText={(text) =>
            setLeaveDetails((prev) => ({ ...prev, hospital_name: text }))
          }
        />
      </View>
      <View>
        <Text style={styles.textTitle}>Application</Text>
        <TextInput
          placeholder="Write your reason for leave"
          numberOfLines={8}
          value={leaveDetails.reason}
          style={[
            styles.textContainer,
            { textAlignVertical: "top", padding: 15 },
          ]}
          onChangeText={(text) =>
            setLeaveDetails((prev) => ({ ...prev, reason: text }))
          }
        />
      </View>
      <PrimaryButton
        backgroundColor="#000"
        color="#FFF"
        label="Submit Leave"
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    paddingHorizontal: 15,
    gap: 20,
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
});

export default DoctorLeave;

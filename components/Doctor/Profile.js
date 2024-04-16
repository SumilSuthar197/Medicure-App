import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { lightTextColor, textBlack } from "../../constants/color";

const Profile = ({ bio, schedule, duration }) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <View>
      <View>
        <Text style={styles.bottomCardTitle}>About</Text>
        <Text style={styles.bottomCardText}>{bio}</Text>
      </View>
      <View style={styles.scheduleContainer}>
        <Text style={styles.bottomCardTitle}>Schedule</Text>
        {schedule &&
          daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.bottomCardText}>
              {day} : {schedule[index] || "No Hospital"}
            </Text>
          ))}
      </View>
      <View>
        <Text style={styles.bottomCardTitle}>Appointment Duration</Text>
        <Text style={styles.bottomCardText}>{duration} minutes</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomCardText: { color: lightTextColor, fontSize: 16, lineHeight: 22 },
  bottomCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: textBlack,
  },
  scheduleContainer: {
    marginVertical: 12,
    display: "flex",
    flexDirection: "column",
    rowGap: 2,
  },
});

export default Profile;

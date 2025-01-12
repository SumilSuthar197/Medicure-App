import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  backgroundColor,
  blueColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";

const AppointmentCard = ({ item, handleButton1, handleButton2 }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.centered}>
          <Text style={styles.doctorName}>Dr. {item.doctor_name}</Text>
          <Text style={styles.doctorEmail}>{item.doctor_email}</Text>
        </View>
        <Image
          style={styles.image}
          source={{
            uri: item.image
              ? item.image
              : "https://res.cloudinary.com/deohymauz/image/upload/v1704461039/user1_leoif6.png",
          }}
        />
      </View>
      <View>
        <View style={styles.row}>
          <View style={styles.iconRow}>
            <AntDesign name="calendar" size={14} color="#777777" />
            <Text style={styles.lightText}>{item.date}</Text>
          </View>
          <View style={styles.iconRow}>
            <AntDesign name="clockcircleo" size={14} color="#777777" />
            <Text style={styles.lightText}> {item.slot}</Text>
          </View>
          <View style={styles.iconRow}>
            <FontAwesome
              name="circle"
              size={10}
              color={item.status !== "cancelled" ? "green" : "red"}
            />
            <Text style={styles.lightText}>
              {item.status.charAt(0).toUpperCase() +
                item.status.slice(1).toLowerCase()}
            </Text>
          </View>
        </View>
        {item.status !== "cancelled" && (
          <View style={styles.row2}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: backgroundColor }]}
              onPress={() => handleButton1(item._id)}
            >
              <Text style={[styles.buttonText, { color: textBlack }]}>
                {item.button1}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: blueColor }]}
              onPress={() => handleButton2()}
            >
              <Text style={[styles.buttonText, { color: whiteText }]}>
                {item.button2}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteText,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: borderColor,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: backgroundColor,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  centered: {
    justifyContent: "center",
  },
  doctorName: {
    color: textBlack,
    fontSize: 16,
    paddingBottom: 3,
    fontWeight: "600",
  },
  doctorEmail: {
    color: "grey",
    fontSize: 14,
    fontWeight: "500",
  },
  image: {
    width: 50,
    height: 50,
    objectFit: "fill",
    borderRadius: 99,
  },
  row: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 0,
    justifyContent: "space-between",
  },
  row2: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 0,
    justifyContent: "space-between",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  lightText: {
    color: lightTextColor,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "grey",
    height: 40,
    width: "48%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default AppointmentCard;

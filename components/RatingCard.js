import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../constants/color";

const RatingCard = ({ name, image, score, description }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image
          style={styles.reviewerImage}
          source={{
            uri: image,
          }}
        />
        <View style={styles.reviewRow1}>
          <View style={styles.reviewNameView}>
            <Text style={styles.bottomCardTitle}>{name}</Text>
          </View>
          <View style={styles.reviewRating}>
            <AntDesign name="star" size={14} color="#F2921D" />
            <Text style={styles.reviewText}>{score}/5</Text>
          </View>
        </View>
      </View>
      {description && <Text style={styles.bottomCardText}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    marginVertical: 10,
    padding: 12,
    borderRadius: 15,
    backgroundColor: whiteText,
    borderWidth: 1,
    borderColor: borderColor,
  },
  reviewerImage: {
    width: 35,
    height: 35,
    objectFit: "cover",
    borderRadius: 99,
  },
  reviewRow1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
  },
  reviewNameView: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  reviewRating: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF2CC",
    borderRadius: 25,
    paddingHorizontal: 8,
    flexDirection: "row",
    height: 30,
  },
  reviewText: {
    color: textBlack,
    fontSize: 13,
    marginLeft: 4,
  },
  bottomCardText: {
    color: lightTextColor,
    fontSize: 16,
    lineHeight: 22,
    paddingLeft: 2,
    paddingTop: 8,
  },
  bottomCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: textBlack,
  },
});

export default RatingCard;

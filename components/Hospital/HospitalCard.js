import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";

const HospitalCard = ({ data, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.hospitalCard}>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <View>
            <Image
              style={styles.hospitalImage}
              source={{
                uri: data?.image
                  ? data?.image
                  : "https://res.cloudinary.com/dp9kpxfpa/image/upload/v1702994737/g2eobivztu6qbjlvxhbp.jpg",
              }}
              defaultSource={{
                uri: "https://res.cloudinary.com/dp9kpxfpa/image/upload/v1702994737/g2eobivztu6qbjlvxhbp.jpg",
              }}
            />
          </View>
          <View style={{ gap: 3, justifyContent: "center" }}>
            <Text style={styles.hospitalName}>{data?.name}</Text>
            <Text style={styles.hospitalCity}>{data?.city}</Text>
          </View>
        </View>
        <View style={styles.row2}>
          <View style={styles.subTitleView}>
            <Ionicons name="call" size={14} color={lightTextColor} />
            <Text style={styles.subTitleText}>{data?.mobile}</Text>
          </View>
          <Text style={styles.subTitleText}>|</Text>
          <View style={styles.subTitleView}>
            <MaterialIcons name="email" size={14} color={lightTextColor} />
            <Text style={styles.subTitleText}>{data?.email}</Text>
          </View>
          <Text style={styles.subTitleText}>|</Text>
          <Text style={styles.subTitleText}>{data?.state ?? "Karnataka"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hospitalCard: {
    marginVertical: 10,
    padding: 12,
    borderRadius: 15,
    backgroundColor: whiteText,
    borderWidth: 1,
    borderColor: borderColor,
  },
  hospitalImage: {
    width: 50,
    height: 50,
    objectFit: "fill",
    borderRadius: 99,
  },
  hospitalName: { fontSize: 16, fontWeight: "600", color: textBlack },
  hospitalCity: {
    fontSize: 14,
    fontWeight: "500",
    color: lightTextColor,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  subTitleView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  subTitleText: {
    color: lightTextColor,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default HospitalCard;

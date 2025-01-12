import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { blueColor, whiteText } from "../constants/color";

const Tab = ({ title, isActive, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.tab, isActive ? styles.activeTab : styles.inActiveTab]}
  >
    <Text style={[isActive ? styles.activeText : styles.inActiveText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 6,
    borderRadius: 25,
  },
  activeTab: {
    overflow: "hidden",
    width: "45%",
  },
  inActiveTab: {
    width: "45%",
  },
  activeText: {
    textAlign: "center",
    fontSize: 16,
    borderRadius: 25,
    color: whiteText,
    overflow: "hidden",
    backgroundColor: blueColor,
    paddingVertical: 6,
  },
  inActiveText: {
    textAlign: "center",
    fontSize: 16,
    borderRadius: 25,
    color: "#777777",
    width: "100%",
  },
});
export default Tab;

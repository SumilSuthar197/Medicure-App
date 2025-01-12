import { useRouter } from "expo-router";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { blueColor, lightBlueColor, textBlack, whiteText } from "../../constants/color";
const screenWidth = Dimensions.get("window").width;

const AppointmentCard = ({ item, handleOpenPress }) => {
  const router = useRouter();
  const renderLeftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    const borderRadius = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [75, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          router.push({
            pathname: "/Patient",
            params: { email: item?.patient_email },
          })
        }
      >
        <Animated.View
          style={[
            styles.leftView,
            { transform: [{ scale: scale }], borderRadius: borderRadius },
          ]}
        >
          <Animated.Text
            style={[{ transform: [{ scale: scale }] }, styles.SwipeText]}
          >
            View
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  const renderRightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    const borderRadius = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 75],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => handleOpenPress(item?.patient_email, item?._id)}
      >
        <Animated.View
          style={[
            { transform: [{ scale: scale }], borderRadius: borderRadius },
            styles.rightView,
          ]}
        >
          <Animated.Text
            style={[{ transform: [{ scale: scale }] }, styles.SwipeText]}
          >
            Complete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderLeftActions={renderLeftSwipe}
      renderRightActions={renderRightSwipe}
    >
      <View style={styles.cardMain}>
        <View style={styles.cardRow}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.cardImage}
              source={{
                uri: item.patient_image,
              }}
            />
            <View style={styles.nameView}>
              <Text style={styles.name}>{item.patient_name}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.timeText}>{item.slot}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  cardMain: {
    height: 70,
    justifyContent: "center",
    padding: 16,
    width: screenWidth,
    backgroundColor: whiteText,
  },
  cardRow: {
    flexDirection: "row",
    padding: 5,
    paddingHorizontal: 9,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardImage: {
    width: 40,
    height: 40,
    aspectRatio: 1,
    objectFit: "cover",
    borderRadius: 75,
    backgroundColor: lightBlueColor,
  },
  nameView: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: textBlack,
  },
  timeText: { fontSize: 15, fontWeight: "500", color: textBlack },
  rightView: {
    backgroundColor: "green",
    color: whiteText,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 100,
  },
  leftView: {
    backgroundColor: blueColor,
    color: whiteText,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 100,
  },
  SwipeText: {
    color: whiteText,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AppointmentCard;

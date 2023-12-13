import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import {
  backgroundColor,
  blueColor,
  borderColor,
  lightBlueColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../../constants/color";
import PrimaryButton from "../../../components/PrimaryButton";
import BottomSheetComponent from "../../../components/BottomSheetComponent";
import { router } from "expo-router";

const defaultItems = [
  {
    key: "0",
    title: "Herb Tonic",
    price: 10.0,
    quantity: 1,
  },
  {
    key: "1",
    title: "Spicy Tuna",
    price: 12.8,
    quantity: 1,
  },
  {
    key: "2",
    title: "Tunacado",
    price: 10.2,
    quantity: 1,
  },
  {
    key: "3",
    title: "Power Shake",
    price: 10,
    quantity: 1,
  },
  {
    key: "4",
    title: "Power Shake",
    price: 10,
    quantity: 1,
  },
  {
    key: "5",
    title: "Power Shake",
    price: 10,
    quantity: 1,
  },
  {
    key: "6",
    title: "Power Shake",
    price: 10,
    quantity: 2,
  },
];

const screenWidth = Dimensions.get("window").width;
const Item = (props) => {
  const leftSwipe = (progress, dragX) => {
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
        onPress={() => router.push("/Doctor/patientProfile")}
      >
        <Animated.View
          style={[
            { transform: [{ scale: scale }], borderRadius: borderRadius },
            styles.leftView,
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
  const rightSwipe = (progress, dragX) => {
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
        onPress={() => props.handleOpenPress()}
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
    <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
      <View style={styles.cardMain}>
        <View style={styles.cardRow}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.cardImage}
              source={require("../../../assets/images/Image.png")}
            />
            <View style={styles.nameView}>
              <Text style={styles.name}>Sumil Suthar</Text>
            </View>
          </View>
          <View>
            <Text style={styles.timeText}>09:00 PM</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};
const Appointments = () => {
  const snapPoint = useMemo(() => ["75%"], []);
  const bottomSheetRef = useRef(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const handleLogoutPress = () => {
    // Handle logout logic here
    // Example: AsyncStorage.removeItem("userInfo");
    // Example: router.push("/getStarted");
    handleClosePress();
  };
  const [appointmentDate, setAppointmentDate] = useState(
    new Date().toDateString()
  );
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      toggleDatePicker();
      setAppointmentDate(currentDate.toDateString());
    } else {
      toggleDatePicker();
    }
  };
  return (
    <View style={styles.main}>
      <View style={styles.mainPicker}>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
          />
        )}
        <Text style={styles.inputTitle}>Appointment Date:</Text>
        <TouchableOpacity
          onPress={() => toggleDatePicker()}
          style={{
            flex: 1,
            marginLeft: 10,
          }}
        >
          <Text style={styles.pickerText}>{appointmentDate}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.orderTitle}>
        <Text style={styles.subtitle}>Patient Name</Text>
        <Text style={styles.time}>Time</Text>
      </View>

      <View>
        <FlatList
          data={defaultItems}
          renderItem={({ item, index }) => (
            <Item handleOpenPress={handleOpenPress} key={index} {...item} />
          )}
          ItemSeparatorComponent={() => (
            <View style={styles.inBetweenBorder}></View>
          )}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.8, // Increase shadow opacity
          shadowRadius: 10,
          elevation: 10, // Increase elevation
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        index={-1}
        snapPoints={snapPoint}
      >
        <BottomSheetComponent
          onClosePress={handleClosePress}
          onLogoutPress={handleLogoutPress}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { backgroundColor: backgroundColor, flex: 1 },
  mainPicker: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  inputTitle: { fontSize: 16, fontWeight: "600", color: textBlack },
  pickerText: {
    color: lightTextColor,
    textAlign: "center",
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: whiteText,
  },
  orderTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    width: "70%",
    paddingLeft: 5,
    color: textBlack,
  },
  time: {
    color: blueColor,
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
    width: "20%",
  },
  inBetweenBorder: { height: 1, backgroundColor: borderColor },
  container: {
    flex: 1,
    backgroundColor: whiteText,
  },
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
    objectFit: "fill",
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
  leftView: {
    backgroundColor: blueColor,
    color: whiteText,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 100,
  },
  rightView: {
    backgroundColor: "green",
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
export default Appointments;

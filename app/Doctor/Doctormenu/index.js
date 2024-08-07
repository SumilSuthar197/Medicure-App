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
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
// import { Swipeable } from "react-native-gesture-handler";
import {
  backgroundColor,
  blueColor,
  borderColor,
  lightBlueColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../../constants/color";
import BottomSheetComponent from "../../../components/BottomSheetComponent";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Swipeable } from "react-native-gesture-handler";
 
const screenWidth = Dimensions.get("window").width;
const Item = (props) => {
  const leftSwipe = (emailPat, progress, dragX) => {
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
            pathname: "/Doctor/patientProfile",
            params: { email: emailPat },
          })
        }
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
  const rightSwipe = (emailPat, appointmentID, progress, dragX) => {
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
        onPress={() => props.handleOpenPress(emailPat, appointmentID)}
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
      renderLeftActions={(progress, dragX) =>
        leftSwipe(props.patient_email, progress, dragX)
      }
      renderRightActions={(progress, dragX) =>
        rightSwipe(props.patient_email, props._id, progress, dragX)
      }
    >
      <View style={styles.cardMain}>
        <View style={styles.cardRow}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.cardImage}
              source={{
                uri: props.patient_image,
              }}
            />
            <View style={styles.nameView}>
              <Text style={styles.name}>{props.patient_name}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.timeText}>{props.slot}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};
const index = () => {
  const snapPoint = useMemo(() => ["75%"], []);
  const bottomSheetRef = useRef(null);
  const [defaultItems, setDefaultItems] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const fetchData = async (searchData) => {
    try {
      let dateObj = new Date(searchData);
      let formattedDate =
        dateObj.getUTCFullYear() +
        "-" +
        String(dateObj.getUTCMonth() + 1).padStart(2, "0") +
        "-" +
        String(dateObj.getUTCDate()).padStart(2, "0");
      const storedItem = await AsyncStorage.getItem("doctorInfo");
      const jwtToken = JSON.parse(storedItem);
      const response = await axios.get(
        `https://medicure-sumilsuthar197.koyeb.app/doctorappointments/${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setDefaultItems(response.data.appointments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(new Date());
  }, []);
  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = ({ emailPat, appointmentID }) => {
    setSelectedEmail(emailPat);
    setSelectedAppointment(appointmentID);
    bottomSheetRef.current?.expand();
  };
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
      fetchData(selectedDate);
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
          style={styles.pickerButton}
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
        {defaultItems.length === 0 && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text>No Upcoming Appointments</Text>
          </View>
        )}
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        style={styles.bottomSheet}
        index={-1}
        snapPoints={snapPoint}
      >
        <BottomSheetComponent
          onClosePress={handleClosePress}
          onLogoutPress={handleLogoutPress}
          emailPat={selectedEmail}
          appointId={selectedAppointment}
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
  pickerButton: {
    flex: 1,
    marginLeft: 10,
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
export default index;

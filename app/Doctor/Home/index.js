import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
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

import {
  backgroundColor,
  blueColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../../constants/color";
import BottomSheetComponent from "../../../components/Doctor/BottomSheetComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getUpcomingAppointments } from "../../../api/doctor";
import ErrorPage from "../../../components/ErrorPage";
import LoadingScreen from "../../../components/LoadingScreen";
import AppointmentCard from "../../../components/Doctor/AppointmentCard";

const index = () => {
  const bottomSheetRef = useRef(null);
  const snapPoint = useMemo(() => ["75%"], []);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments(new Date());
  }, []);

  const fetchAppointments = async (selectedDate) => {
    try {
      setLoading(true);
      const formattedDate = `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
      const { data } = await getUpcomingAppointments(formattedDate);
      setAppointmentsList(data.appointments);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDatePicker = () => setShowPicker(!showPicker);

  const handleDateChange = (event, selectedDate) => {
    toggleDatePicker();
    if (event.type === "set") {
      setDate(selectedDate);
      fetchAppointments(selectedDate);
    }
  };

  const handleOpenPress = (patientEmail, appointmentID) => {
    setSelectedEmail(patientEmail);
    setSelectedAppointment(appointmentID);
    bottomSheetRef.current?.expand();
  };

  const handleClosePress = () => bottomSheetRef.current?.close();

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.main}>
        <View style={styles.mainPicker}>
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={handleDateChange}
            />
          )}
          <Text style={styles.inputTitle}>Appointment Date:</Text>
          <TouchableOpacity
            onPress={() => toggleDatePicker()}
            style={styles.pickerButton}
          >
            <Text style={styles.pickerText}>{date.toDateString()}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orderTitle}>
          <Text style={styles.subtitle}>Patient Name</Text>
          <Text style={styles.time}>Time</Text>
        </View>
        <View style={{ flex: 1 }}>
          {loading ? (
            <LoadingScreen text="fetching Upcoming Appointments" />
          ) : (
            <FlatList
              data={appointmentsList}
              renderItem={({ item, index }) => (
                <AppointmentCard
                  handleOpenPress={handleOpenPress}
                  item={item}
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={styles.inBetweenBorder}></View>
              )}
              ListEmptyComponent={() => (
                <ErrorPage
                  height={Dimensions.get("window").height}
                  width={Dimensions.get("window").width}
                  textContent={"No Upcoming Appointments"}
                />
              )}
            />
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
            patientEmail={selectedEmail}
            appointmentID={selectedAppointment}
          />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
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

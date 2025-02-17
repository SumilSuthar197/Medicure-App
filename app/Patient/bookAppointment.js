import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import PrimaryButton from "../../components/PrimaryButton";
import CustomPicker from "../../components/CustomPicker";
import {
  backgroundColor,
  blueColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import { countries } from "../../constants/symptoms";
import { bookAppointment } from "../../api/patient";

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [responses, setResponses] = useState([]);
  const [clicked, setClicked] = useState(false);
  const item = useLocalSearchParams();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 45);

  const postingAppointment = async () => {
    try {
      const newFormattedTime = startTime + "-" + endTime;
      await bookAppointment({
        doctor_email: item.email,
        date: selectedDate,
        symptoms: selectedSymptoms,
        time: newFormattedTime,
        answers: responses,
      });
      Alert.alert(
        "Appointment Booked Successfully",
        "Your appointment has been booked successfully. You will receive a confirmation email shortly."
      );
      setResponses([]);
      router.replace("/Patient/Home");
    } catch (e) {
      console.log(e);
    }
  };
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setMarkedDates({
      [day.dateString]: {
        selected: true,
        marked: true,
        selectedColor: blueColor,
      },
    });
  };
  const handleSelectionChange = (updatedArray) => {
    setSelectedSymptoms(updatedArray);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <ScrollView>
        <View style={styles.topContainer}>
          <View>
            <Calendar
              style={{ borderWidth: 1, borderColor: "#e5e5e5" }}
              markedDates={markedDates}
              onDayPress={handleDayPress}
              minDate={new Date().toISOString().slice(0, 10)}
              maxDate={maxDate.toISOString().slice(0, 10)}
            />
          </View>
          <Text
            style={[styles.selectedDateText, { marginTop: 10, padding: 0 }]}
          >
            {`Appointment Date:  ${selectedDate}`}
          </Text>
          <View>
            <Text style={styles.selectedDateText}>Select Symptoms:</Text>
            <ScrollView style={styles.selectedSymptoms}>
              <Text>{selectedSymptoms.join(", ")}</Text>
            </ScrollView>
            <View style={{ flex: 1 }}>
              <CustomPicker
                countryList={countries}
                selectedCountries={selectedSymptoms}
                onSelectionChange={handleSelectionChange}
              />
            </View>
          </View>
        </View>
        <View style={styles.questionContainer}>
          {item.question &&
            item.question.split("&&&&").map((question, index) => (
              <View key={index} style={{ marginVertical: 5 }}>
                <Text style={styles.questionText}>
                  {question}
                  <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.questionInput}
                  placeholder="Type your response here"
                  onChangeText={(text) => {
                    const newResponses = [...responses];
                    newResponses[index] = text;
                    setResponses(newResponses);
                  }}
                />
              </View>
            ))}
        </View>
        <View style={[styles.questionContainer, { gap: 15 }]}>
          <View>
            <Text style={styles.questionText}>
              Your preferred time slot start time
              <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              placeholder="09:30 AM"
              value={startTime}
              style={styles.textContainer}
              onChangeText={(text) => setStartTime(text)}
            />
          </View>
          <View>
            <Text style={styles.questionText}>
              Your preferred time slot end time
              <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              placeholder="09:30 PM"
              value={endTime}
              style={styles.textContainer}
              onChangeText={(text) => setEndTime(text)}
            />
          </View>
        </View>
        <View style={styles.questionContainer}>
          <TouchableOpacity
            style={[
              styles.paymentContainer,
              { borderColor: clicked ? "green" : borderColor },
            ]}
            onPress={() => setClicked(!clicked)}
          >
            <Feather
              name="check-circle"
              size={20}
              color={clicked ? "green" : lightTextColor}
            />
            <Text style={{ color: clicked ? "green" : lightTextColor }}>
              Pay using your wallet
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.questionContainer}>
          <PrimaryButton
            backgroundColor="#246BFD"
            color="#FFF"
            label="Make Payment"
            onPress={postingAppointment}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: backgroundColor,
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  selectedDateText: {
    fontSize: 17,
    fontWeight: "600",
    paddingVertical: 10,
  },
  selectedSymptoms: {
    backgroundColor: whiteText,
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  questionContainer: { paddingHorizontal: 20, marginBottom: 20 },
  questionText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
    marginLeft: 3,
    color: textBlack,
  },
  questionInput: {
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 12,
    backgroundColor: whiteText,
    borderColor: borderColor,
    borderWidth: 1,
    color: lightTextColor,
    textDecorationLine: "none",
    width: "100%",
    marginHorizontal: "auto",
  },
  paymentContainer: {
    backgroundColor: whiteText,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    gap: 5,
    borderWidth: 1,
  },
  paymentText: { color: textBlack, textAlign: "center" },
  textContainer: {
    fontSize: 14,
    fontWeight: "500",
    paddingLeft: 12,
    paddingRight: 12,
    height: 48,
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

export default BookAppointment;

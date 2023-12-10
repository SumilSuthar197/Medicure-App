import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import PrimaryButton from "../../components/PrimaryButton";

const BookAppointment = () => {
  const sampleTimings = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
  ];

  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [selectedTiming, setSelectedTiming] = useState(null);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setMarkedDates({
      [day.dateString]: { selected: true, marked: true, selectedColor: "blue" },
    });
    setSelectedTiming(null);
  };

  const handleTimingPress = (timing) => {
    setSelectedTiming(timing);
  };

  const isButtonDisabled = !selectedDate || !selectedTiming;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView>
        <View
          style={{ backgroundColor: "#FFF", flex: 1, paddingHorizontal: 20 }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: "bold", paddingVertical: 10 }}
          >
            Select a Date:
          </Text>
          <View>
            <Calendar
              style={{ borderWidth: 1, borderColor: "#e5e5e5" }}
              markedDates={markedDates}
              markingType={"period"}
              onDayPress={handleDayPress}
            />
          </View>
          {selectedDate && (
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingVertical: 10,
                }}
              >
                Selected Date: {selectedDate}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingVertical: 10,
                }}
              >
                Available Timings:
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent:"space-between"
                }}
              >
                {sampleTimings.map((timing, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleTimingPress(timing)}
                    style={{
                      borderRadius: 25,
                      borderWidth: 1,
                      borderColor: "#e5e5e5",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      margin: 5,
                      backgroundColor:
                        selectedTiming === timing ? "#246BFD" : "#FFF",
                    }}
                  >
                    <Text
                      style={{
                        color: selectedTiming === timing ? "#FFF" : "#000",
                      }}
                    >
                      {timing}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
        <View style={{ marginVertical: 25, paddingHorizontal: 20 }}>
          <PrimaryButton
            backgroundColor="#246BFD"
            color="#FFF"
            label="Make Payment"
            onPress={() => {
              if (!isButtonDisabled) {
                console.log("Payment button pressed");
                // Add your payment logic here
              }
            }}
            disabled={isButtonDisabled}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookAppointment;

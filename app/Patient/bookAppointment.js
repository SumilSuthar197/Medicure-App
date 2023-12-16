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
import CustomPicker from "../../components/CustomPicker";
import {
  backgroundColor,
  borderColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import { countries } from "../../constants/symptoms";

const BookAppointment = () => {
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

  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleSelectionChange = (updatedArray) => {
    setSelectedCountries(updatedArray);
  };
  const isButtonDisabled = !selectedDate || !selectedTiming;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <View
        style={{
          backgroundColor: backgroundColor,
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: 15,
        }}
      >
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
                fontSize: 17,
                fontWeight: "600",
                paddingVertical: 10,
              }}
            >
              Selected Date: {selectedDate}
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                paddingVertical: 10,
              }}
            >
              Select Symptoms:
            </Text>
            <ScrollView
              style={{
                backgroundColor: whiteText,
                height: 90,
                marginBottom: 20,
                borderRadius: 15,
                borderColor: "#dbeafe",
                paddingVertical: 8,
                paddingHorizontal: 10,
              }}
            >
              <Text>{selectedCountries.join(", ")}</Text>
            </ScrollView>
            <View style={{ flex: 1 }}>
              <CustomPicker
                countryList={countries}
                selectedCountries={selectedCountries}
                onSelectionChange={handleSelectionChange}
              />
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
            // if (!isButtonDisabled) {
            console.log("Payment button pressed");
            console.log(selectedCountries);
            // }
          }}
          // disabled={isButtonDisabled}
        />
      </View>
    </SafeAreaView>
  );
};

export default BookAppointment;

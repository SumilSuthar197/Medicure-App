import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import PrimaryButton from "../../components/PrimaryButton";
import CustomPicker from "../../components/CustomPicker";
import {
  backgroundColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import { countries } from "../../constants/symptoms";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { backendUrl } from "../../constants/URL";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [selectedTiming, setSelectedTiming] = useState(null);

  const item = useLocalSearchParams();
  useEffect(() => {
    setItemQuestion(item.question);
  }, []);
  const postingAppointment = async () => {
    setLoading(true);
    try {
      const storedItem = await AsyncStorage.getItem("userInfo");
      const jwtToken = JSON.parse(storedItem);
      const newFormattedTime = startTime + "-" + endTime;
      const response = await axios.post(
        `${backendUrl}/ai_schedule`,
        {
          date: selectedDate,
          symptoms: selectedCountries,
          doctor_email: item.email,
          time: newFormattedTime,
          answers: responses,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      Alert.alert(
        "Appointment Booked Successfully",
        "Your appointment has been booked successfully. You will receive a confirmation email shortly."
      );
      setResponses([]);
      router.push("./menu");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setMarkedDates({
      [day.dateString]: { selected: true, marked: true, selectedColor: "blue" },
    });
    setSelectedTiming(null);
  };

  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleSelectionChange = (updatedArray) => {
    setSelectedCountries(updatedArray);
  };
  const isButtonDisabled = !selectedDate || !selectedTiming;

  const { confirmPayment } = useStripe();
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [itemQuestion, setItemQuestion] = useState([]);
  const [responses, setResponses] = useState([]);
  const [clicked, setClicked] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <ScrollView>
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
                  height: 50,
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
        <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
          {item.question &&
            item.question.split(",").map((question, index) => (
              <View key={index} style={{ marginVertical: 5 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    marginBottom: 3,
                    marginLeft: 3,
                    color: textBlack,
                  }}
                >
                  {question}
                </Text>
                <TextInput
                  style={{
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
                  }}
                  onChangeText={(text) => {
                    const newResponses = [...responses];
                    newResponses[index] = text;
                    setResponses(newResponses);
                  }}
                />
              </View>
            ))}
        </View>
        <View style={{ paddingHorizontal: 20, gap: 15, marginBottom: 15 }}>
          <View>
            <Text style={styles.textTitle}>
              Your preferred timeslot start time{" "}
            </Text>
            <TextInput
              placeholder="09:30 AM"
              value={startTime}
              style={styles.textContainer}
              onChangeText={(text) => setStartTime(text)}
            />
          </View>
          <View>
            <Text style={styles.textTitle}>
              Your preferred timeslot end time
            </Text>
            <TextInput
              placeholder="09:30 PM"
              value={endTime}
              style={styles.textContainer}
              onChangeText={(text) => setEndTime(text)}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
          <TouchableOpacity
            style={
              clicked
                ? {
                    backgroundColor: whiteText,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    gap: 5,
                    borderWidth: 1,
                    borderColor: "green",
                  }
                : {
                    backgroundColor: whiteText,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    gap: 5,
                  }
            }
            onPress={() => setClicked(!clicked)}
          >
            <View>
              <Feather
                name="check-circle"
                size={20}
                color={clicked ? "green" : lightTextColor}
              />
            </View>
            <Text
              style={
                clicked
                  ? { color: "green", paddingLeft: 5 }
                  : { color: lightTextColor, paddingLeft: 5 }
              }
            >
              Pay using your wallet
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: textBlack, textAlign: "center" }}>OR</Text>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={{
              backgroundColor: "#FFFFFF",
              textColor: "#000000",
            }}
            style={{
              width: "100%",
              height: 50,
            }}
          />
        </View>
        <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
          <PrimaryButton
            backgroundColor="#246BFD"
            color="#FFF"
            label="Make Payment"
            onPress={postingAppointment}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
    marginLeft: 3,
    color: textBlack,
  },
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

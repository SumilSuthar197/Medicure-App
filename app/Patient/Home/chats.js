import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { bookAppointment, sendUserQuery } from "../../../api/patient";
import {
  blueColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../../constants/color";
import { useRouter } from "expo-router";
import DoctorCardComponent from "../../../components/ChatComponent/DoctorCardComponent";
import TextMessageComponent from "../../../components/ChatComponent/TextMessageComponent";

const Chat = () => {
  const router = useRouter();
  const [messageData, setMessageData] = useState([
    {
      from: "backend",
      id: "0.6609624369455623",
      message: "Hi, how can I help you?",
    },
  ]);
  const [message, setMessage] = useState("");

  const sendMessageToBackend = async (userMessage) => {
    setMessageData((prevMessages) => [
      ...prevMessages,
      { id: Math.random().toString(), message: userMessage, from: "me" },
    ]);
    try {
      const response = await sendUserQuery(userMessage);
      const formatResponse = {
        id: Math.random().toString(),
        message: response.data.output,
        from: response.data.doctor ? "doctor" : "backend",
      };
      setMessageData((prevMessages) => [...prevMessages, formatResponse]);
    } catch (error) {
      const formatResponse = {
        id: Math.random().toString(),
        message: "Unable to process your request at the moment",
        from: "backend",
      };
      setMessageData((prevMessages) => [...prevMessages, formatResponse]);
    }
  };

  const handleSendMessage = () => {
    sendMessageToBackend(message);
    setMessage("");
  };

  const handleBookAppointment = async (doctor) => {
    try {
      await bookAppointment({
        doctor_email: doctor.email,
        date: doctor.date,
        symptoms: doctor.symptoms,
        answers: [],
        time: "10:00 AM - 10:00 PM",
      });
      const formatDate = new Date(doctor.date).toDateString();
      const formatResponse = {
        id: Math.random().toString(),
        message: `Your appointment with Dr. ${doctor.name} has been successfully booked for ${formatDate}. \n\nSpecialization: ${doctor.education.field} \nSymptoms: ${doctor.symptoms} \nLocation: ${doctor.location} \n\nFor any inquiries, please contact: ${doctor.contact}`,
        from: "backend",
      };
      setMessageData((prevMessages) => [...prevMessages, formatResponse]);
    } catch (error) {
      console.log(error);
      const formatResponse = {
        id: Math.random().toString(),
        message: "Unable to book appointment at the moment",
        from: "backend",
      };
      setMessageData((prevMessages) => [...prevMessages, formatResponse]);
    }
  };

  const onViewProfile = (doctor) => {
    router.push({
      pathname: "/Patient/doctorDetails",
      params: {
        email: doctor?.email,
      },
    });
  };

  const renderMessage = ({ item }) => {
    if (item.from === "doctor") {
      return (
        <View>
          {item?.message?.map((doctor, index) => (
            <DoctorCardComponent
              key={index}
              doctor={doctor}
              onBookAppointment={handleBookAppointment}
              onViewProfile={onViewProfile}
            />
          ))}
        </View>
      );
    }

    return (
      <TextMessageComponent
        message={item?.message}
        isUser={item.from === "me"}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.messagesList}
        data={messageData}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type your message here"
          style={styles.input}
          onChangeText={(text) => setMessage(text)}
          value={message}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: "flex-end",
  },
  messagesList: {
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 3,
    borderTopColor: "white",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  sendButton: {
    backgroundColor: blueColor,
    padding: 7,
    borderRadius: 10,
    overflow: "hidden",
  },
  sendButtonText: {
    color: "white",
  },
});

export default Chat;

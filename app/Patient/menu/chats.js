import axios from "axios";
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
 
import {
  blueColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../../constants/color";
import PrimaryButton from "../../../components/PrimaryButton";

const Chat = () => {
  const [messageData, setMessageData] = useState([
    {
      from: "backend",
      id: "0.6609624369455623",
      message: "Hi, how can i help you?",
    },
  ]);
  const [message, setMessage] = useState("");

  const sendMessageToBackend = async (userMessage) => {
    setMessageData((prevMessages) => [
      ...prevMessages,
      { id: Math.random().toString(), message: userMessage, from: "me" },
    ]);
    await axios
      .post(`https://medicure-sumilsuthar197.koyeb.app/getchat`, { prompt: userMessage })
      .then((res) => {
        if (res.data.doctor === false) {
          const response = {
            id: Math.random().toString(),
            message: res.data.output,
            from: "backend",
          };
          setMessageData((prevMessages) => [...prevMessages, response]);
        } else {
          const response = {
            id: Math.random().toString(),
            message: res.data.output,
            from: "doctor",
          };
          setMessageData((prevMessages) => [...prevMessages, response]);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSendMessage = () => {
    sendMessageToBackend(message);
    setMessage("");
  };

  const renderMessage = ({ item }) => {
    if (item.from === "doctor") {
      return (
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 10,
            width: "70%",
            padding: 12,
            borderRadius: 15,
            backgroundColor: whiteText,
            borderWidth: 1,
            borderColor: borderColor,
          }}
        >
          <View style={{ flexDirection: "row", gap: 20 }}>
            <View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "fill",
                  borderRadius: 99,
                }}
                source={{
                  uri: item.message[0].image
                    ? item.message[0].image
                    : "https://res.cloudinary.com/deohymauz/image/upload/v1704545467/demoDoctor_hkhmdp.jpg",
                }}
              />
            </View>
            <View style={{ gap: 3, justifyContent: "center" }}>
              <Text
                style={{ fontSize: 16, fontWeight: "600", color: textBlack }}
              >
                {item.message[0].name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: lightTextColor,
                }}
              >
                {item.message[0].education.field}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 10,
              paddingHorizontal: 5,
              marginTop: 5,
            }}
          >
            <PrimaryButton
              backgroundColor={blueColor}
              color={whiteText}
              label="Book Appointment"
              onPress={async () => {
                const storedItem = await AsyncStorage.getItem("userInfo");
                const jwtToken = JSON.parse(storedItem);
                await axios.post(
                  `https://medicure-sumilsuthar197.koyeb.app/ai_schedule`,
                  {
                    doctor_email: item.message[0].email,
                    date: item.message[0].date,
                    symptoms: item.message[0].symptoms,
                    answers: ["yes", "no", "yes"],
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${jwtToken}`,
                    },
                  }
                );
              }}
            />
          </View>
        </View>
      );
    }

    return (
      <View
        style={{
          backgroundColor: item.from === "me" ? "#246BFD" : "#FFF",
          alignSelf: item.from === "me" ? "flex-end" : "flex-start",
          margin: 5,
          padding: 10,
          borderRadius: 10,
          maxWidth: "80%",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
          elevation: 1,
        }}
      >
        <Text style={{ color: item.from === "me" ? "#FFF" : "#246BFD" }}>
          {item.message}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginVertical: 5 }}
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
          <Text style={{ color: "white" }}>Send</Text>
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
    backgroundColor: "#246BFD",
    padding: 7,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default Chat;

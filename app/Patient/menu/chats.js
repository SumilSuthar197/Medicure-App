// // import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
// // import React from "react";
// // import messageData from "../../../constants/Message";

// // import { MaterialIcons } from "@expo/vector-icons";

// // const Message = ({ message }) => {
// //   const isMyMessage = () => {
// //     return message.from === "me";
// //   };
// //   // console.log(message);
// //   return (
// //     <View
// //       style={{
// //         backgroundColor: isMyMessage() ? "#246BFD" : "#FFF",
// //         alignSelf: isMyMessage() ? "flex-end" : "flex-start",
// //         margin: 5,
// //         padding: 10,
// //         borderRadius: 10,
// //         maxWidth: "80%",
// //         shadowColor: "#000",
// //         shadowOffset: {
// //           width: 0,
// //           height: 1,
// //         },
// //         shadowOpacity: 0.18,
// //         shadowRadius: 1.0,
// //         elevation: 1,
// //       }}
// //     >
// //       <Text style={{ color: isMyMessage() ? "#FFF" : "#246BFD" }}>
// //         {message.message}
// //       </Text>
// //     </View>
// //   );
// // };

// // const chats = () => {
// //   return (
// //     <View style={styles.main}>
// //       <FlatList
// //         data={messageData}
// //         renderItem={({ item }) => <Message message={item} />}
// //         styles={styles.list}
// //         inverted
// //       />
// //       <View
// //         style={{
// //           flexDirection: "row",
// //           backgroundColor: "whitesmoke",
// //           paddingVertical: 5,
// //           paddingHorizontal: 5,
// //           justifyContent: "center",
// //           alignItems: "center",
// //           borderTopWidth: 3,
// //           borderTopColor: "white",
// //         }}
// //       >
// //         <TextInput
// //           placeholder="Ask Your Question Here"
// //           style={{
// //             flex: 1,
// //             backgroundColor: "white",
// //             padding: 5,
// //             paddingHorizontal: 10,
// //             marginHorizontal: 5,
// //             borderRadius: 10,
// //             borderColor: "lightgray",
// //             borderWidth: 1,
// //           }}
// //         />
// //         <MaterialIcons
// //           style={{
// //             backgroundColor: "#246BFD",
// //             padding: 7,
// //             borderRadius: 10,
// //             overflow: "hidden",
// //           }}
// //           name="send"
// //           size={24}
// //           color="white"
// //         />
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   main: { flex: 1, paddingHorizontal: 5 },
// //   list: { padding: 10 },
// // });

// // export default chats;
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";

// const Chat = () => {
//   const [messageData, setMessageData] = useState([]);

//   const sendMessageToBackend = async (message) => {
//     // Simulate sending the message to the backend
//     const response = {
//       id: Math.random().toString(),
//       message: `Backend Response to: ${message}`,
//       from: "backend",
//     };

//     // Update the messageData with the user's message and the backend response
//     setMessageData((prevMessages) => [
//       ...prevMessages,
//       { id: Math.random().toString(), message, from: "me" },
//       response,
//     ]);
//   };

//   const handleSendMessage = () => {
//     // You can add additional validation or checks here before sending the message
//     const userMessage = "User message"; // Replace with the actual user's message
//     sendMessageToBackend(userMessage);
//   };

//   const renderMessage = ({ item }) => (
//     <View
//       style={{
//         backgroundColor: item.from === "me" ? "#246BFD" : "#FFF",
//         alignSelf: item.from === "me" ? "flex-end" : "flex-start",
//         margin: 5,
//         padding: 10,
//         borderRadius: 10,
//         maxWidth: "80%",
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 1,
//         },
//         shadowOpacity: 0.18,
//         shadowRadius: 1.0,
//         elevation: 1,
//       }}
//     >
//       <Text style={{ color: item.from === "me" ? "#FFF" : "#246BFD" }}>
//         {item.message}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messageData}
//         renderItem={renderMessage}
//         inverted
//         keyExtractor={(item) => item.id}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           placeholder="Type your message here"
//           style={styles.input}
//           onChangeText={(text) => setMessage(text)}
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
//           <Text style={{ color: "white" }}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 5,
//     justifyContent: "flex-end",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     backgroundColor: "whitesmoke",
//     paddingVertical: 5,
//     paddingHorizontal: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     borderTopWidth: 3,
//     borderTopColor: "white",
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "white",
//     padding: 5,
//     paddingHorizontal: 10,
//     marginHorizontal: 5,
//     borderRadius: 10,
//     borderColor: "lightgray",
//     borderWidth: 1,
//   },
//   sendButton: {
//     backgroundColor: "#246BFD",
//     padding: 7,
//     borderRadius: 10,
//     overflow: "hidden",
//   },
// });

// export default Chat;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Chat = () => {
  const [messageData, setMessageData] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessageToBackend = async (userMessage) => {
    // Simulate sending the message to the backend
    const response = {
      id: Math.random().toString(),
      message: `Backend Response to: ${userMessage}`,
      from: "backend",
    };

    // Update the messageData with the user's message and the backend response
    setMessageData((prevMessages) => [
      ...prevMessages,
      { id: Math.random().toString(), message: userMessage, from: "me" },
      response,
    ]);
  };

  const handleSendMessage = () => {
    // You can add additional validation or checks here before sending the message
    sendMessageToBackend(message);
    // Clear the input field after sending the message
    setMessage("");
  };

  const renderMessage = ({ item }) => (
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

  return (
    <View style={styles.container}>
      <FlatList
      style={{marginVertical:5}}
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

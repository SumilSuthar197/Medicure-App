// import React, { useState } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import messageData from "../constants/Message";

// const ChatScreen = () => {
//   const [messages, setMessages] = useState(messageData);

//   const onSend = (newMessages = []) => {
//     setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
//   };

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(newMessages) => onSend(newMessages)}
//       user={{
//         _id: 1, // Replace with the user ID
//       }}
//     />
//   );
// };

// export default ChatScreen;

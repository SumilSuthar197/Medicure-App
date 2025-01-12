import { StyleSheet, Text, View } from "react-native";
import { blueColor, whiteText } from "../../constants/color";

const TextMessageComponent = ({ message, isUser }) => {
  return (
    <View
      style={[
        styles.messageBubble,
        isUser ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <Text
        style={isUser ? styles.sentMessageText : styles.receivedMessageText}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  sentMessage: {
    backgroundColor: blueColor,
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: whiteText,
    alignSelf: "flex-start",
  },
  sentMessageText: {
    color: whiteText,
  },
  receivedMessageText: {
    color: blueColor,
  },
});
export default TextMessageComponent;

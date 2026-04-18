import { StyleSheet, Text, View } from "react-native";

const Messages = ({ messages }) => {
  return (
    <View
      style={[
        styles.message,
        messages.sender === "other" && {
          alignSelf: "flex-end",
          backgroundColor: "#DCF8C6",
        },
      ]}
    >
      <Text>{messages.text}</Text>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  message: {
    alignItems: "flex-start",
    borderWidth: 1,
  },
});

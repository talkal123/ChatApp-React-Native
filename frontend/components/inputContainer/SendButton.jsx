import { StyleSheet, Text, TouchableOpacity } from "react-native";

const SendButton = ({ sendMessage }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={sendMessage}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>שלח</Text>
    </TouchableOpacity>
  );
};

export default SendButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 5,

    marginLeft: 8,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

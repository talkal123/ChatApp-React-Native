import { TextInput as RNTextInput, StyleSheet, View } from "react-native";

const TextInput = ({ text, setText }) => {
  return (
    <View style={styles.inputContainer}>
      <RNTextInput
        style={styles.input}
        value={text}
        onChangeText={(newText) => setText(newText)}
        placeholder={"הקלד הודעה..."}
        placeholderTextColor="#999"
        multiline
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 120,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    color: "#000",
    textAlign: "right",
  },
});

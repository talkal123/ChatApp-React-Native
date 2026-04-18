import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Register from "./pages/Register";
import textDb from "./textDb.json";

export default function HomeScreen() {
  const [messages, setMessages] = useState(textDb);

  return (
    <SafeAreaProvider>
      {/* <View style={styles.container}>
        <View style={styles.messagesWrapper}>
          <FlatListContainer messages={messages} setMessages={setMessages} />
        </View>

        <View style={styles.inputWrapper}>
          <InputContainer messages={messages} setMessages={setMessages} />
        </View>
      </View> */}
      <Register />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e3e3da",
  },
  messagesWrapper: {
    flex: 9,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
});

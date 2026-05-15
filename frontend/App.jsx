import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Register from "./pages/Register";

export default function HomeScreen() {
  // const [messages setMessages] = useState(textDb);

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
      <Text className="text-blue-500">sssssד</Text>
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

import { FlatList, StyleSheet, View } from "react-native";
import Messages from "./Messages";

const FlatListContainer = ({ messages, setMessages }) => {
  console.log(messages);

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.messageItem}>
          <Messages messages={item} />
        </View>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
};

export default FlatListContainer;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "red",
  },

  messageItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  listContent: {
    flexGrow: 1,
  },
});

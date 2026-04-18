import { useState } from "react";
import { StyleSheet, View } from "react-native";
import SendButton from "./SendButton";
import TextInput from "./TextInput";

const InputContainer = ({ messages, setMessages }) => {
  const [text, setText] = useState("");
  const botResponses = [
    "היי! איך אתה?",
    "מה נשמע היום?",
    "נשמע טוב!",
    "לא הבנתי 😅 תסביר לי שוב",
    "יפה מאוד 👍",
    "אוי, זה מעניין!",
    "הכל בסדר אצלך?",
    "וואו, מגניב!",
    "אהה, עכשיו הבנתי",
    "חכה רגע, אני חושב על זה 🤔",
  ];

  const sendMessage = () => {
    const newTextMe = { id: Date.now(), text: text, sender: "me" };
    let randomValue = Math.floor(Math.random() * botResponses.length);
    const newTextOther = {
      id: Date.now(),
      text: botResponses[randomValue],
      sender: "other",
    };
    if (text !== "") {
      setMessages((prev) => [...prev, newTextMe]);
      setText("");
      setTimeout(() => {
        setMessages((prev) => [...prev, newTextOther]);
      }, 1000);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput text={text} setText={setText} />
      <SendButton sendMessage={sendMessage} />
    </View>
  );
};

export default InputContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

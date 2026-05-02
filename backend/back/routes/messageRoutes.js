const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");


let users = require("../data/users.js");
let chats = require("../data/chatsData.js");


router.get("/chat/:chatId", (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      return res.status(401).json({ message: "לא נשלח צאט איי די" });
    }
    const findChat = chats.find(c => c.id === chatId)
    if (!findChat) {
      return res.status(200).json({ message:" לא נמצא צאט עם ה-ID הזה", findChat: [] });
    } 
    const allMessages = findChat.messages 
   if (allMessages.length === 0) {
      return res.status(200).json({ message: "הצאט ריק מהודעות", allMessages: [] });
    }
    return res.status(200).json({ message: "הודעות נשלפו בהצלחה", allMessages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "משהו נכשל" });
  }
});

router.get("/user/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(401).json({ message: "לא נשלח יוזר איי די" });
    }
    const findMessages = chats.filter(c => c.messages.some(m => m.senderId === userId))
    
    const allMessages = findMessages.map(item => item.messages)
    const flatMessages = allMessages.flat();
    const onlyMyMessages = flatMessages.filter(m => m.senderId === userId)

     if (findMessages.length === 0) {
      return res.status(200).json({ message: "לא נמצאו הודעות למשתמש זה", findMessages: [] });
    }
    return res.status(200).json({ message: "צאט נמצא", onlyMyMessages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "משהו נכשל" });
  }
});


router.post("/", (req, res) => {
  try {
    const { message, user, chatId } = req.body;
    if (!message || !user || !chatId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const findChat = chats.find(c => c.id === chatId)
    if (!findChat) {
        return res.status(403).json({ message: "צאט לא קיים" });
    }
    const findUserInChat = findChat.users.includes(user)
      if (!findUserInChat) {
        return res.status(403).json({ message: "חלה שגיאה המשתמש לא קיים בצאט" });
      }

    const newMessage = {
      message,
      user,
      id: String(Date.now()),
      created: String(Date.now()),
    };
    findChat.messages.push(newMessage);
    res.status(200).json({ message: "הודעה נוספה", newMessage });
  } catch (error) {
    return res.status(500).json({ message: "משהו נכשל" });
  }
});


router.delete("/delete/:userId", (req, res) => {
  try {
    const { userId } = req.params    
    const { messageId, chatId} = req.body;

    if (!messageId || !userId || !senderId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const findChat = chats.find(c => c.id === userId)
    if (!findChat) {
        return res.status(404).json({ message: "אין צאט קיים" });
    }
    const findMessage = findChat.messages.find(c => c.id === messageId)
    if (!findMessage) {
        return res.status(404).json({ message: "לא נמצא הודעה" });
    }
    console.log(findMessage);
    if (findMessage.senderId !== userId) {
      return res.status(404).json({ message: "רק המשתמש ששלח הודעה יכול למחוק אותה" });
    }
    
    const removeMessage = findChat.messages.filter(m => m.id !== messageId)
    findChat.messages = removeMessage
    res.status(200).json({ message: "הודעה נמחקה" });
  } catch (error) {
    return res.status(500).json({ message: "משהו נכשל" });
  }
});

module.exports = router;

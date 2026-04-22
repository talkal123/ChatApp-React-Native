const express = require("express");
const router = express.Router();

let chats = require("../data/chatsData.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");
const { isAdminMiddleware } = require("../middleware/isAdminMiddleware.js");

router.get("/", (req, res) => {
  res.send(chats);
});

router.get("/group", (req, res) => {
  try {
    const groupChat = chats.filter((c) => c.isGroupChat === true);
    res.status(200).json({ message: "צאט נמצא", groupChat });
  } catch (error) {
    return res.status(500).json({ message: "משהו נכשל" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const userId = req.params.id;
    const findChats = chats.filter(c => c.messages.some(m => m.senderId === userId))
    res.status(200).json({ message: "צאט נמצא", findChats });
  } catch (error) {
    return res.status(500).json({ message: "משהו נכשל" });
  }
});

router.post("/chat",(req, res) => {
  try {
    const { chatName, isGroupChat, user } = req.body;
    if (!chatName || !user) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    const newChat = {
      chatName,
      isGroupChat: isGroupChat || false,
      users: [user],
      createdBy:user,
      id: String(Date.now()),
      messages:[]
    };
    chats.push(newChat);
    res.status(200).json({ message: "צאט התווסף", newChat });
  } catch (error) {
    return res.status(500).json({ message: "משהו נכשל" });
  }
});

router.post("/message", (req, res) => {
  try {
    const { message, user, chatId } = req.body;
    if (!message || !user || !chatId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const findChat = chats.find(c => c.id === chatId)
    if (!findChat) {
        return res.status(403).json({ message: "צאט לא קיים" });

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

router.delete("/message", (req, res) => {
  try {
    const { messageId, chatId} = req.body;
    if (!messageId || !chatId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const findChat = chats.find(c => c.id === chatId)
    if (!findChat) {
        return res.status(404).json({ message: "אין צאט קיים" });
    }
    const findMessage = findChat.messages.find(c => c.id === messageId)
    if (!findMessage) {
        return res.status(404).json({ message: "לא נמצא הודעה" });
    }
    const removeMessage = findChat.messages.filter(m => m.id !== messageId)
    findChat.messages = removeMessage
    res.status(200).json({ message: "הודעה נמחקה" });
  } catch (error) {
    return res.status(500).json({ message: "משהו נכשל" });
  }
});

router.delete("/:id", authMiddleware, (req, res) => {
  try {
    const id = req.params.id;
    const findById = chats.find((c) => c.id === id);
    if (!findById) {
      return res.status(400).json({ message: "No chat to delete" });
    }
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "אין הרשאה לפעולה זאת" });
      
    }

    chats = chats.filter((c) => c.id != id);
    res.status(200).json({ message: "צאט נמחק", chats });
  } catch (error) {
    return res.status(500).json({ message: "משהו נכשל" });
  }
});

module.exports = router;

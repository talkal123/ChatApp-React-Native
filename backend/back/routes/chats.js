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


router.post("/groupChat",(req, res) => {
  try {
    const { chatName, isGroupChat, user } = req.body;
    if (!chatName || !user) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    const newChat = {
      chatName,
      isGroupChat: isGroupChat || true,
      users: [user],
      createdBy:user,
      id: String(Date.now()),
      messages:[]
    };
    chats.push(newChat);
    res.status(200).json({ message: "צאט התווסף", newChat });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({ message: "משהו נכשל" });
  }
});

router.post("/groupChat/addUser",(req, res) => {
  try {
    const { chatName, user } = req.body;
    if (!chatName || !user) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const findChat = chats.find(c => c.chatName === chatName)
    if (!findChat) {
      return res.status(400).json({ message: "לא נמצא צאט" });
    }

    const findUserInChat = findChat.users.find(u => u === user)
    if (findUserInChat) {
      return res.status(400).json({ message: "משתמש זה כבר נמצא בצאט" });
    }
     findChat.users.push(user);
    res.status(200).json({ message: "משתמש התווסף", findChat });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({ message: "משהו נכשל" });
  }
});

router.delete("/groupChat/deleteUser",(req, res) => {
  try {
    const { chatName, user } = req.body;
    if (!chatName || !user) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const findChat = chats.find(c => c.chatName === chatName)
    if (!findChat) {
      return res.status(400).json({ message: "לא נמצא צאט" });
    }

    const findUserInChat = findChat.users.find(u => u === user)
    if (!findUserInChat) {
      return res.status(400).json({ message: "משתמש זה לא נמצא בצאט" });
    }
     findChat.users = findChat.users.filter(u => u !== user);
    res.status(200).json({ message: "משתמש הוסר", findChat });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({ message: "משהו נכשל" });
  }
});

// צאט לפי יוזר 

router.get("/sender/:senderId", (req, res) => {
  try {
    const { senderId } = req.params;
    if (!senderId) {
      return res.status(401).json({ message: "לא נשלח יוזר איי די" });
    }
    const findChats = chats.filter(c => c.users.includes(senderId))
     if (findChats.length === 0) {
      return res.status(200).json({ message: "לא נמצאו צאטים למשתמש זה", findChats: [] });
    }
    return res.status(200).json({ message: "צאט נמצא", findChats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({ message: "משהו נכשל" });
  }
});


// מציאת צאט לפי איי די

router.get("/:chatId", (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      return res.status(401).json({ message: "לא נשלח chat איי די" });
    }
    const findChats = chats.filter(c => c.id === chatId)
     if (findChats.length === 0) {
      return res.status(200).json({ message: "לא נמצאו צאטים למשתמש זה", findChats: [] });
    }
    return res.status(200).json({ message: "צאט נמצא", findChats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({ message: "משהו נכשל" });
  }
});

router.post("/",(req, res) => {
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

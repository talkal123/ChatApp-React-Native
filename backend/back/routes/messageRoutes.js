const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");


let users = require("../data/usersData.js");
let chats = require("../data/chatsData.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");


router.get("/chat/:chatId",authMiddleware, (req, res) => {
  try {
    const currentUserId = req.user.id; 
    const { chatId } = req.params;
    if (!chatId || !currentUserId) {
      return res.status(400).json({ message: "לא נשלח צאט איי די וטוקן" });
    }
    const findChat = chats.find(c => c.id === chatId)
    if (!findChat) {
      return res.status(404).json({ message:" לא נמצא צאט עם ה-ID הזה", data: null });
    } 
    const allMessages = findChat.messages 
   if (allMessages.length === 0) {
      return res.status(200).json({ message: "הצאט ריק מהודעות", data: []});
    }
    return res.status(200).json({ message: "הודעות נשלפו בהצלחה", data: allMessages});
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "משהו נכשל" });
  }
});

router.get("/user/:userId",authMiddleware, (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { userId } = req.params;
    if (!userId || !currentUserId) {
      return res.status(400).json({ message: "לא נשלח יוזר איי די או טוקן" });
    }
    
    const userChats  = chats.filter(c => c.messages.some(m => m.senderId === userId))
    
    const allMessages = userChats .map(item => item.messages)
    const flatMessages = allMessages.flat();
    const onlyMyMessages = flatMessages.filter(m => m.senderId === userId)

     if (userChats.length === 0) {
      return res.status(200).json({ message: "לא נמצאו הודעות למשתמש זה", data: [] });
    }
    return res.status(200).json({ message: "הודעות נמצאו", data:onlyMyMessages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "משהו נכשל" });
  }
});


router.post("/", authMiddleware,(req, res) => {
  try {
    const currentUserId = req.user.id;
    const { message, chatId } = req.body;
    if (!message || !currentUserId || !chatId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const findChat = chats.find(c => c.id === chatId)
    if (!findChat) {
        return res.status(404).json({ message: "צאט לא נמצא" });
    }
    const findUserInChat = findChat.users.includes(currentUserId)
      if (!findUserInChat) {
        return res.status(403).json({ message: "חלה שגיאה המשתמש לא קיים בצאט" });
      }

    const newMessage = {
      text: message,
      senderId: currentUserId,
      id: String(Date.now()),
      createdAt: new Date().toISOString()
    };
    findChat.messages.push(newMessage);
    res.status(200).json({ message: "הודעה נוספה", data:newMessage });
  } catch (error) {
    return res.status(500).json({ message: "משהו נכשל" });
  }
});


router.delete("/delete",authMiddleware, (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { messageId, chatId} = req.body;

    if (!messageId || !chatId  || !currentUserId ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const findChat = chats.find(c => c.id === chatId)
    if (!findChat) {
        return res.status(404).json({ message: "אין צאט קיים" });
    }
    const findMessage = findChat.messages.find(c => c.id === messageId)
    if (!findMessage) {
        return res.status(404).json({ message: "לא נמצא הודעה" ,data :messageId});
    }
    if (findMessage.senderId !== currentUserId) {
      return res.status(403).json({ message: "רק המשתמש ששלח הודעה יכול למחוק אותה" });
    }
    
    const removeMessage = findChat.messages.filter(m => m.id !== messageId)
    findChat.messages = removeMessage
    res.status(200).json({ message: "הודעה נמחקה", data: messageId });
  } catch (error) {
    return res.status(500).json({ message: "משהו נכשל" });
  }
});

module.exports = router;

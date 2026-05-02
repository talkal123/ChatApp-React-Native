const express = require("express");
const router = express.Router();

let chats = require("../data/chatsData.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");
const { isAdminMiddleware } = require("../middleware/isAdminMiddleware.js");

router.get("/", authMiddleware,isAdminMiddleware,(req, res) => {
  res.send(chats);
});

router.get("/group", authMiddleware,isAdminMiddleware,(req, res) => {
  try {
    const groupChat = chats.filter((c) => c.isGroupChat === true);
    res.status(200).json({ message: "צאט נמצא", groupChat });
  } catch (error) {
    return res.status(500).json({ message: "משהו נכשל" });
  }
});


router.post("/groupChat", authMiddleware, (req, res) => {
  try {
    // req.user מגיע מה-authMiddleware אחרי שפוענח מה-Token
    const currentUserId = req.user.id; 
    const { chatName, isGroupChat } = req.body;

    if (!chatName || !currentUserId) {
      return res.status(400).json({ message: "חובה להזין שם לצאט או טוקן" });
    }

    const newChat = {
      id: String(Date.now()),
      chatName,
      isGroupChat: isGroupChat !== undefined ? isGroupChat : true, 
      users: [currentUserId], 
      createdBy: currentUserId,
      messages: []
    };

    chats.push(newChat);

    res.status(201).json({ 
      message: "צאט קבוצתי נוצר בהצלחה", 
      newChat 
    });

  } catch (error) {
    console.error("Create Chat Error:", error);
    return res.status(500).json({ message: "שגיאת שרת ביצירת צאט" });
  }
});

router.post("/groupChat/addUser",authMiddleware,(req, res) => {
  try {
    const currentUser = req.user; 
    const { chatName ,user } = req.body;
    if (!chatName || !user) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const findAdminChat = chats.find(c => c.createdBy === currentUser.id)
    if (!findAdminChat) {
      return res.status(400).json({ message: "משתמש לא אדמין" });
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

router.delete("/groupChat/deleteUser",authMiddleware,(req, res) => {
  try {
    const currentUser = req.user; 
    const { chatName ,userToRemove} = req.body;
    if (!chatName || !currentUser || !userToRemove) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const findChat = chats.find(c => c.chatName === chatName)
    if (!findChat) {
      return res.status(400).json({ message: "לא נמצא צאט" });
    }

    const findMeInChat = findChat.users.find(u => u === currentUser.id)
    if (!findMeInChat) {
      return res.status(400).json({ message: "משתמש זה לא נמצא בצאט" });
    }
    const findUserInChat = findChat.users.find(u => u === userToRemove)
    if (!findUserInChat) {
      return res.status(400).json({ message: "משתמש זה לא נמצא בצאט" });
    }
    const checkIfAdmin = findChat.createdBy === currentUser.id
    if (!checkIfAdmin) {
      return res.status(400).json({ message: "משתמש זה לא אדמין" });
    }
     findChat.users = findChat.users.filter(u => u !== userToRemove);
    res.status(200).json({ message: "משתמש הוסר", findChat });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({ message: "משהו נכשל" });
  }
});






router.post("/",authMiddleware,(req, res) => {
  try {
    const currentUser = req.user; 
    const { chatName, isGroupChat } = req.body;
    if (!chatName || !currentUser.id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    const newChat = {
      chatName,
      isGroupChat: isGroupChat || false,
      users: [currentUser.id],
      createdBy:currentUser.id,
      id: String(Date.now()),
      messages:[]
    };
    chats.push(newChat);
    res.status(200).json({ message: "צאט התווסף", newChat });
  } catch (error) {
    return res.status(500).json({ message: "משהו נכשל" });
  }
});




// צאט לפי יוזר 

router.get("/sender/:userId",authMiddleware, (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { userId } = req.params;
    if (!userId || !currentUserId) {
      return res.status(401).json({ message: "לא נשלח יוזר איי די" });
    }
    const findChats = chats.filter(c => c.users.includes(userId))
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

router.get("/:chatId", authMiddleware,(req, res) => {
  try {
    const currentUserId = req.user.id;
    const { chatId } = req.params;
    if (!chatId || !currentUserId) {
      return res.status(401).json({ message: "לא נשלח chat איי די" });
    }
    const findChats = chats.find(c => c.id === chatId)
     if (findChats.length === 0) {
      return res.status(200).json({ message: "לא נמצאו צאטים למשתמש זה", findChats: [] });
    }
    return res.status(200).json({ message: "צאט נמצא", findChats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({ message: "משהו נכשל" });
  }
});


router.delete("/:id", authMiddleware,isAdminMiddleware, (req, res) => {
  try {
    const id = req.params.id;
    const findById = chats.find((c) => c.id === id);
    if (!findById) {
      return res.status(400).json({ message: "No chat to delete" });
    }
    
    chats = chats.filter((c) => c.id !== id);
    res.status(200).json({ message: "צאט נמחק", chats });
  } catch (error) {
    return res.status(500).json({ message: "משהו נכשל" });
  }
});

module.exports = router;

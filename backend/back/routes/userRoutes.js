const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { authMiddleware } = require("../middleware/authMiddleware.js");
const { authorization } = require("../middleware/authorization.js");
const { isAdminMiddleware } = require("../middleware/isAdminMiddleware.js");

let users = require("../data/users.js");

router.get("/allUsers", authMiddleware, isAdminMiddleware, (req, res) => {
  res.json(users);
});

router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!email || !password || !userName) {
      return res.status(400).json({ message: "נא למלא את כל השדות" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "נא להזין כתובת אימייל תקינה" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "סיסמה חייבת להכיל לפחות 6 תווים" });
    }
    const findUser = users.find((u) => u.email === email);
    if (findUser) {
      return res.status(400).json({ message: " כבר קיים" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      userName,
      email,
      password: hashedPassword,
      id: Date.now().toString(),
      role: "admin",
    }; // לזכור לשנות בעתיד ליוזר רול חשוב!
    users.push(newUser);
    res
      .status(201)
      .json({
        message: "וולידציה עברה בהצלחה! משתמש נרשם.",
        userId: newUser.id,
        newUser,
      });
  } catch (error) {
    return res.status(500).json({ message: " משהו נכשל" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "נא למלא את כל השדות" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "נא להזין כתובת אימייל תקינה" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "סיסמה חייבת להכיל לפחות 6 תווים" });
    }
    const findUser = users.find((u) => u.email === email);
    if (!findUser) {
      return res.status(400).json({ message: "אימייל או סיסמא לא נכונים  " });
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (isMatch) {
      const token = jwt.sign(
        { email: findUser.email, id: findUser.id, role: findUser.role },
        process.env.SECRET,
        { expiresIn: "1h" },
      );
      return res
        .status(200)
        .json({ message: "  ההתחברות בוצעה בהצלחה", token });
    } else {
      return res.status(401).json({ message: "  אימייל או סיסמא לא נכונים" });
    }
  } catch (error) {
    return res.status(500).json({ message: " משהו נכשל" });
  }
});


router.delete("/delete_user/:userId", authMiddleware, isAdminMiddleware, (req, res) => {
  try {
    const {userId} = req.params;

    const findUser = users.find(u => u.id === userId);

    if (!findUser) {
      return res.status(404).json({ message: "משתמש לא נמצא" });
    }

    users = users.filter(u => u.id !== userId);

    return res.status(200).json({
      message: "משתמש נמחק",
    });

  } catch (error) {
    return res.status(500).json({ message: "שגיאת שרת" });
  }
});

module.exports = router;

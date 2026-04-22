const authorization = (req, res, next) => {
    console.log(req.user);
    try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "אין הרשאה" })
    }

    next()
  } catch (error) {
    return res.status(500).json({ message: "שגיאת שרת" })
  }
    

}




module.exports = {
  authorization,
};
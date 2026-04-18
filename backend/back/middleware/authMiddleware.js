const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
let users = require("../data/users")

const authMiddleware = (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;
    const request = req.headers 
    
    if (!request) {
      return res.status(401).json({ message: "נא לשלוח בקשה תקינה ( Header)" });
    }

    if (!headerToken ) {
      return res.status(401).json({ message: "נא לשלוח טוקן (Authorization Header)" });
    }
    const token = headerToken.trim().split(" ");
    
    
    if (token[0] !== "Bearer" || token.length < 2 || token[1] == "") {
        return res.status(401).json({ message: "פורמט טוקן לא תקין (צריך להיות 'Bearer <token>')"})
    }
    const validateToken = jwt.verify(token[1], process.env.SECRET);
    if (validateToken) {
      console.log("✅ שומר הראש: הטוקן תקין! הפלייאוד:", validateToken);
   }
    const checkRole = validateToken.role == "" || (validateToken.role !== "admin" && validateToken.role !== "user")

    const checkTokenValid =  checkRole || !validateToken.id || typeof validateToken.id !== "string"
    

    if (checkTokenValid) {
      return res.status(401).json({ message: "פורמט טוקן לא תקין (צריך להיות 'Bearer <token>')"})
    }

    const findUser = users.find(u => u.id === validateToken.id)

    if (!findUser ) {
      return res.status(401).json({ message: "משתמש לא נמצא במערכת"})
    }

    const user =  {id:findUser.id, email:findUser.email, role:findUser.role }
      req.user = user  
      next();
  
  } catch (error) {
    return res.status(401).json({ message: "טוקן לא בתוקף או שגוי" });
  }

};

module.exports = {
  authMiddleware,
};

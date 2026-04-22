const mongoose = require('mongoose');

// Define the Schema focused on Auth and Validation
const userSchema = new mongoose.Schema({
  id:{
    type: String,
    require: true
  },
  userName: {
    type: String,
    required: [true, 'נא להזין שם משתמש'], // הודעת שגיאה מותאמת אישית
    trim: true,
    minlength: [2, 'שם משתמש חייב להכיל לפחות 2 תווים'] // ולידציה על אורך
  },
  email: {
    type: String,
    required: [true, 'נא להזין אימייל'],
    unique: true, 
    trim: true,
    lowercase: true, 
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'נא להזין כתובת אימייל תקינה']
  },
  password: { 
    type: String,
    required: [true, 'נא להזין סיסמה'],
    minlength: [6, 'סיסמה חייבת להכיל לפחות 6 תווים'], 
    select: false 
  },
  isOnline: {
    type:Boolean,
    require: true,
  },
  isBlocked: {
    type:Boolean,
    require: true,
  },
  role:{
    type:String,
    require:true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);
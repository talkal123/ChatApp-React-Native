let users = [
  {
    id: "u1", // שונה מ-1 ל-u1
    userName: "ישראל ישראלי",
    email: "israel.israeli@example.com",
    password: "password123",
    isOnline: true,
    role: "user",
    isBlocked: false,
  },
  {
    id: "u2", // שונה מ-2 ל-u2
    userName: "נועה כהן",
    email: "noa.cohen@testmail.co.il",
    password: "secretPassword",
    isOnline: true,
    role: "user",
    isBlocked: false,
  },
  {
    id: "u3", // שונה מ-3 ל-u3
    userName: "דוד לוי",
    email: "david.levi@workplace.org",
    password: "mySecurePassword",
    isOnline: true,
    role: "admin",
    isBlocked: false,
  },
  {
    id: "u4", // שונה מ-4 ל-u4
    userName: "מיכל אברהם",
    email: "michal.avraham@gmail.com",
    password: "simple12345",
    isOnline: false,
    role: "user",
    isBlocked: false,
  },
];

module.exports = users;

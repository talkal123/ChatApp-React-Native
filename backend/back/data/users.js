let users = [
  {
    id: "1",
    userName: "ישראל ישראלי",
    email: "israel.israeli@example.com",
    password: "password123",
    isOnline: true,
    role: "user",
    isBlocked: false,
  },
  {
    id: "2",
    userName: "נועה כהן",
    email: "noa.cohen@testmail.co.il",
    password: "secretPassword",
    isOnline: true,
    role: "user",
    isBlocked: false,
  },
  {
    id: "3",
    userName: "דוד לוי",
    email: "david.levi@workplace.org",
    password: "mySecurePassword",
    isOnline: true,
    role: "admin",
    isBlocked: false,
  },
  {
    id: "4",
    userName: "מיכל אברהם",
    email: "michal.avraham@gmail.com",
    password: "simple12345",
    isOnline: false,
    role: "user",
    isBlocked: false,
  },
];

module.exports = users;

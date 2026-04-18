 let chats = [
  {
    id: "101",
    chatName: "חברים",
    isGroupChat: true,
    users: [
      { name: "Tal", email: "tal@gmail.com" },
      { name: "Dan", email: "dan@gmail.com" },
      { name: "Noa", email: "noa@gmail.com" }
    ]
  },
  {
    id: "202",
    chatName: "שיחה עם דן",
    isGroupChat: false,
    users: [
      { name: "Tal", email: "tal@gmail.com" },
      { name: "Dan", email: "dan@gmail.com" }
    ]
  },
  {
    id: "z303",
    chatName: "משפחה",
    isGroupChat: true,
    users: [
      { name: "Tal", email: "tal@gmail.com" },
      { name: "Mom", email: "mom@gmail.com" },
      { name: "Dad", email: "dad@gmail.com" }
    ]
  },
  {
    id: "404",
    chatName: "עבודה",
    isGroupChat: true,
    users: [
    { name: "Tal", email: "tal@gmail.com" },
    { name: "boss", email: "boss@gmail.com" },
    { name: "colleague1", email: "col1@gmail.com" },
    { name: "colleague2", email: "col2@gmail.com" }
    ]
  },
];

module.exports = chats
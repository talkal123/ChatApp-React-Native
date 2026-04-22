let chats = [
  {
    id: "c101",
    chatName: "חברים",
    isGroupChat: true,
    createdBy: "u1",
    users: ["u1", "u2", "u3"],
    messages: []
  },
  {
    id: "c202",
    chatName: "שיחה פרטית",
    isGroupChat: false,
    createdBy: "u1",
    users: ["u1", "u2"],
    messages: [
      {
        id: "m1",
        senderId: "u1",
        text: "מה קורה?",
        createdAt: "2026-04-22T20:00:00Z"
      }
    ]
  },
  {
    id: "c303",
    chatName: "משפחה",
    isGroupChat: true,
    createdBy: "u1",
    users: ["u1", "u4", "u5"],
    messages: []
  },
  {
    id: "c404",
    chatName: "עבודה",
    isGroupChat: true,
    createdBy: "u6",
    users: ["u1", "u6", "u7", "u8"],
    messages: [
      {
        id: "m2",
        senderId: "u6",
        text: "יש עדכון על הפרויקט?",
        createdAt: "2026-04-22T20:10:00Z"
      },
      {
        id: "m3",
        senderId: "u1",
        text: "כן, מתקדם יפה",
        createdAt: "2026-04-22T20:11:00Z"
      }
    ]
  },
  {
    id: "c505",
    chatName: "לימודים",
    isGroupChat: true,
    createdBy: "u3",
    users: ["u1", "u3", "u9"],
    messages: []
  }
];

module.exports = chats;
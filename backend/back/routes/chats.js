
const express = require("express")
const router = express.Router()

let chats = require("../data/data.js")


router.get("/",(req,res) => {
    res.send(chats)
})

router.get("/group",(req,res) => {
    const groupChat = chats.filter(c => c.isGroupChat === true)
    res.send(groupChat)
})

router.get("/:id",(req,res) => {
    const id = req.params.id
    const find = chats.find(c => c.id === id)
    res.send(find)
})


router.post("/",(req,res) => {
    const {chatName,isGroupChat,users} = req.body
    if (!chatName || !users) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const newChat = {chatName,isGroupChat : isGroupChat || false,users,id:String(Date.now())}
    chats.push(newChat)
    res.send(newChat)
})

router.delete("/:id",(req,res) => {
    const id = req.params.id
    const findById = chats.find(c => c.id === id)
    if (!findById) {
        return res.status(400).json({ message: "No chat to delete" });
    }
    chats.filter(c => c.id != id)
    res.send(chats)
})






module.exports = router
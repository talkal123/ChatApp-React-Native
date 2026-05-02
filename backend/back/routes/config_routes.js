const indexR = require('./index')
const chatsR = require('./chatsRoutes')
const userRoutesR = require('./userRoutes')
const messageRoutesR = require('./messageRoutes')



exports.routesInit = (app) => {
    app.use("/" ,indexR )
    app.use("/api/chat" , chatsR)
    app.use("/api/users" , userRoutesR)
    app.use("/api/message" , messageRoutesR)
}
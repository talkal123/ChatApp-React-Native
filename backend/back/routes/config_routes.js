const indexR = require('./index')
const chatsR = require('./chats')
const userRoutesR = require('./userRoutes')



exports.routesInit = (app) => {
    app.use("/" ,indexR )
    app.use("/api/chat" , chatsR)
    app.use("/api/users" , userRoutesR)

}
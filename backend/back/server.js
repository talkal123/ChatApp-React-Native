const express = require("express")
const dotenv = require("dotenv")
const app = express()
const cors = require('cors')
const { routesInit } = require("./routes/config_routes")

dotenv.config();
app.use(cors())
app.use(express.json())

routesInit(app)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));

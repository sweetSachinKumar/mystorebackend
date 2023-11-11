require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 4000 || process.env.PORT
const mongodb = require('./db')

const cors = require("cors")
app.use(cors(
    {
        origin: "https://hotel-backend-xi.vercel.app",
        methods: ["POST", "GET", "DELETE", "PUT"],
        credentials: true
      }
))
app.use(express.json({ limit: "25mb" }))
app.use('/product', require('./routes/product'))
 app.use("/cart/", require("./routes/Cart2"))
app.use("/auth", require("./routes/user"))
app.use("/order", require("./routes/order"))




app.get("/", (req, res)=> {
    res.send("hey whats")
})



app.listen(PORT, ()=> console.log(`this port is running on http://localhost:${PORT}`) )
mongodb(process.env.MONGODB_URL) 
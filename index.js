require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 4000 || process.env.PORT
const mongodb = require('./db')
const cors = require("cors")


app.use(cors())
app.use(express.json({}))


app.use('/product', require('./routes/product'))
 app.use("/cart/", require("./routes/myCart"))
app.use("/auth", require("./routes/user"))
app.use("/order", require("./routes/order"))


app.get("/", (req, res)=> {
    res.send("hey whats")
})

app.get("/this", (req, res)=> {
    res.send("hey this whats")
})


app.listen(PORT, ()=> console.log(`this port is running on http://localhost:${PORT}`) )
mongodb(process.env.MONGODB_URL) 
require('dotenv').config()
const mongoose = require('mongoose')

const url = "mongodb://127.0.0.1:27017/myAPI"



const connectDB = async () => {
    console.log("connected to mongodb")
    await mongoose.connect(url)
}

 
module.exports = connectDB
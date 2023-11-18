const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../model/Order')
const fetchuser = require('../middleware/fetchuser')


// get any one order
router.post('/getaOrder/:id', fetchuser, async (req, res) => {
    try {
        const urlId = req.params.id

        let getorder = await Order.findById(urlId)


        if (!getorder) {
            return res.status(404).json({ status: 'Not found' })
        }

        res.json({ status: "ok", getorder })

    }
    catch (err) {
        res.json({ error: "some error occuerd" })
    }
})



//url fo get all order for user : login required
router.post("/allordersuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        //  const allorders = await Order.find({user:userId})
        const allorders = await Order.find({ user: userId })
        res.json({ allorders })
    }

    catch (err) {
        res.json({ error: "some error occuerd" })
    }

})



//url fo get all order for admin : no login required for a while
router.post("/allorders", fetchuser, async (req, res) => {
    try {
        // const userId = req.user.id
        //  const allorders = await Order.find({user:userId})
        const allorders = await Order.find({})
        res.json({ allorders })
    }

    catch (err) {
        res.json({ error: "some error occuerd" })
    }

})



// url for add to order 
router.post("/addtoorder", fetchuser, async (req, res) => {

    // if there are errors then return bad request  and error
    const { username, address, phone, price, quantity, thumbnail, title, shipping } = req.body
    try {
        const addtoorder = await Order.create({ username, address, phone, price, quantity, thumbnail, title, shipping, user: req.user.id })
        res.json({ status: "ok", data: addtoorder })
    } catch (err) {
        res.status(500).json({ error: "internal server error", err })
    }
})



// for update order status
router.put("/updateorder/:id", fetchuser, async (req, res) => {
    const urlId = req.params.id
    const { orderStatus } = req.body
    if (!orderStatus) {
        return res.status(400).json({ error: "orderStatus is undefinde" })
    }

    try {
        let getItem = await Order.findById(urlId)

        if (!getItem) {
            return res.status(404).json({ status: 'Not found' })
        }

        if (orderStatus == "deleverd") {
            getItem = await Order.findByIdAndUpdate(urlId, { $set: { orderStatus, payment: true } }, { new: true })
        } else {
            getItem = await Order.findByIdAndUpdate(urlId, { $set: { orderStatus } }, { new: true })
        }

        res.json({ status: "ok", getItem })

    } catch (err) {
        return res.status(500).json({ error: "internal server error" })
    }
})



module.exports = router
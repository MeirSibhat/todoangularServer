
const express = require('express');
const router = express.Router();
const todolist = require('../testList')
const moment = require('moment');
const { todoModel } = require('../models/toDoModel');
const _ = require("lodash"); 
router.get('/', (req, res) => {

    todoModel.find({}).sort({ date: 'desc' }).then(data => {

        res.json(data)
    })

})

router.post('/add', async (req, res) => {
    console.log(req.body)
    try {
        req.body.date = moment().format('MM/DD/YYYY');
        let newDat = await todoModel.insertMany([req.body]);
        let sendBack = await todoModel.find({})
        res.json(sendBack)

    } catch (error) {
        console.log(error);
        res.json(error.message)
    }
})
router.post('/edit', async (req, res) => {
    // get id    and change the name and category
    console.log(req.body.id)
    try {
        await todoModel.replaceOne({ _id: req.body.id }, { name: req.body.name, category: req.body.category });
        let sendBack = await todoModel.find({})
        res.json(sendBack)
    } catch (error) {
        console.log(error)
        res.json({ message: " edit error" })
    }
})
router.post('/remove', async (req, res) => {
    // get id to remove and send all the list

    try {
        await todoModel.findByIdAndDelete({ _id: req.body.id });
        let sendBack = await todoModel.find({})
        res.json(sendBack)
    } catch (error) {
        res.json({ message: " remove error" })
    }

})
router.get('/sort/:val', (req, res) => {
    let valSort=req.params.val
    console.log(valSort)
    todoModel.find({}).then(data => {
       let tempList = _.sortBy(data, valSort); 
       console.log(tempList)
        res.json(tempList)
    })
})
router.post('/removeAll', async (req, res) => {
    try {
        await todoModel.deleteMany()
        let sendBack = await todoModel.find({})
        res.json(sendBack)
    } catch (error) {
        res.json({ message: " remove error" })
    }

})
module.exports = router;

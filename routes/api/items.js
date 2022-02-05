const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
var Items = require('../../schema models/itemsSchema')

router.get('/useremail',(req, res) => {
    Items.findOne()
    .then(Items => res.json(Items))
})

router.get('/', (req, res,) => {
    Items.find({Email: req.query.email},(error,docs)=>{
        console.log(docs)
        res.json(docs)
    })})
    
router.post('/newItem', (req, res) => {

    const newItem = new Items({
        ProductType:req.body.ProductType,
        ProductDescription:req.body.ProductDescription,
        Price:req.body.Price,
        Quantity:req.body.Quantity,
        Value: req.body.Value,
        Discount:req.body.Discount,
        Date:req.body.Date,
        Email:req.body.Email
    }) 
     newItem.save().then(Item => {res.json(Item) }).catch(err => (console.log(err)))


    }
    )
router.get('/delete/(:id)', (req, res) => {
    Items.findByIdAndDelete(req.params.id).then(() => { res.json({ msg: 'deleted' }) })
})

router.put('/update/(:id)', (req, res) => {
    Items.findByIdAndUpdate(req.params.id).then(Item => {
        Item.Type = req.body.Type,
            Item.Description = req.body.Description
            Item.Quantity=req.body.Quantity
            Item.Discount=req.body.Discount
        Item.save().then(Item => res.json({ msg: Item.name + 'data updated' }))

    })
})


module.exports = router;
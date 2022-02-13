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
    console.log(req)
    Items.find({Email: req.query.email},(error,docs)=>{
        var doc=docs
        var Producttypefilter= [...new Set(docs.map(value =>  value.ProductType))]
        res.json({doc,Producttypefilter})
    })})

router.get('/filter', (req, res) => {
    var data ={
        ProductType:undefined,
        ProductDescription:undefined,
        Price:undefined,
        Quantity: undefined,
        Discount:undefined
    }


    console.log(req)
})
router.post('/search',(req,res)=>{
    console.log(req.body)
    var searchvalue= req.body.Value
    Items.find({Email: req.body.email}).find({$or:[
      {ProductDescription:{$regex:searchvalue,$options: 'i'}},
      {ProductType:{$regex:searchvalue,$options: 'i'}} 
    ]})
    .then(docs=>{
        console.log(docs)
        res.json(docs)})
})   
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
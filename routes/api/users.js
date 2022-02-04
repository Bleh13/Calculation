const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
var userprofiles = require('../../schema models/userSchema');




router.get('/', (req, res) => {
    userprofiles.find()
    .then(users => res.json(users))
})


router.post('/registration', (req, res) => {

    console.log(req.body);

    userprofiles.findOne({ email: req.body.email }).then(user => {
        if (user) { return res.status(400).json({ email: 'email already exists.' }) }
        else {
            
            const avatar = gravatar.url(req.body.email, {
                s: '200',//size
                d: 'mm'//default
            })
            const newuser = new userprofiles({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phonenumber:req.body.phonenumber,
                avatar
            })
             newuser.save().then(user => {res.json(user) }).catch(err => (console.log(err)))


           


            // (res.json(user))
            // 

        }
    }
    )
})
router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;


    userprofiles.findOne({ email: email}).then(user => {
        if (!user) { res.json({ email: 'emaildoesntexist' }) }
        else {
            return (
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            IDstore(user.id);
                            res.json({ msg: 'login succesful' })
                        }

                        else {
                            return res.json({ password: 'doesntmatch' })
                        }
                    })
            )
        }
    })

})
router.get('/delete/(:id)', (req, res) => {
    userprofiles.findByIdAndDelete(req.params.id).then(() => { res.json({ msg: 'deleted' }) })
})
router.get('/usersupdate',(req,res)=>{
    console.log(req)
    userprofiles.find({email:req.query.email},(error,docs)=>{
        
        res.json(docs);
    })})
router.put('/update/(:id)', (req, res) => {
    console.log(req)
    userprofiles.findOneAndUpdate(req.body.currentemailid).then(user => {
        user.name = req.body.name,
            user.email = req.body.newemail
            user.phonenumber=req.body.phonenumber
        user.save().then(user => res.json({ msg: user.name + 'data updated' }))

    })
})
       
module.exports = router;
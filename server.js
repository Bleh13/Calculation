const express= require('express')
const mongoose= require('mongoose')
const users= require('./routes/api/users')
const items= require('./routes/api/items')
const profile = require('./routes/api/items')
const cors=require('cors')


const app=express();
const db= `mongodb+srv://bleh:fKQ4GxRgN7n5dRU6@cluster0.uforu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(db,{ autoIndex: false }).then(()=>console.log('db connected')).catch(err=>console.log(err))

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method"
    );
    if (req.method === "OPTIONS") {
    return res.status(200).end();
    }
    next();
    });





app.get('/',(req,res)=>res.send('Helloo'))
app.use('/users',users)
app.use('/items',items)
app.use('/profile',profile)
const port= process.env.port || 5001;
app.listen(port,()=> console.log(`server runnin on port  ${port}`));

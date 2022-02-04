const mongoose=require('mongoose')
const passport=require('passport')
var user=mongoose.model('users')
const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const key=require('./keys')


var opts={}
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken;
opts.secretOrKey=key.jwtkey;
module.exports= passport=>{
passport.use( new JwtStrategy(opts,(payload,done)=>{
   console.log(payload) ;
}))}
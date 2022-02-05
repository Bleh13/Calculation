const mongoose=require('mongoose')
const bcrypt= require('bcryptjs')
var schema= mongoose.Schema;
var userprofile= new schema(
    {
        name:{type:String, },
        email:{type:String},
        password:{type:String},
        phonenumber: {type:String},
        avatar:{type:String},
        date:{type:Date, default:Date.now}
    }
)
userprofile.pre("save", async function(next){
     var salt= await bcrypt.genSalt(10);
     if(this.password){
     this.password= await bcrypt.hash(this.password,salt);
     }
    next();
    

})
var userprofiles=mongoose.model('users',userprofile)
module.exports=userprofiles;
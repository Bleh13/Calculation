const mongoose=require('mongoose')
const bcrypt= require('bcryptjs')
var schema= mongoose.Schema;
var ItemsSchema= new schema(
    {
        
        ProductType:{type:String },
        ProductDescription:{type:String},
        Price:{type:Number},
        Quantity:{type:Number},
        Value: {type:Number},
        Discount:{type:Number},
        Date:{type:Date, default:Date.now},
        Email:{type:String,required:true}
    }
)
ItemsSchema.index({ProductDescription:"text", ProductType:"text",})
const Items=module.exports=mongoose.model('Items',ItemsSchema)
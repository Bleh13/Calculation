const mongoose=require('mongoose')
const bcrypt= require('bcryptjs')
var schema= mongoose.Schema;
var Items= new schema(
    {
        
        ProductType:{type:String , index:true},
        ProductDescription:{type:String,index:true},
        Price:{type:Number},
        Quantity:{type:Number},
        Value: {type:Number},
        Discount:{type:Number},
        Date:{type:Date, default:Date.now},
        Email:{type:String,required:true}
    }
)
Items.index({ProductDescription:'text', ProductType:'text'})
var items =mongoose.model('items',Items)
module.exports=items;
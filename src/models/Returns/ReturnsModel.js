const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    UserEmail:{type:String},
    CustomerID:{type:mongoose.Schema.Types.ObjectId},
    VatTax:{type:Number},
    Total:{type:Number},
    Dew:{type:Number},
    Cash:{type:Number},
    GrandTotal:{type:Number},
    Note:{type:String},
    CreatedDate:{type:Date,default:Date.now()}
},{versionKey:false});
const ReturnsModel=mongoose.model('returns',DataSchema);
module.exports=ReturnsModel
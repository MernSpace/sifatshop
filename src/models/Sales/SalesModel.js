const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    UserEmail:{type:String},
    CustomerID:{type:mongoose.Schema.Types.ObjectId},
    VatTax:{type:Number},
    Total:{type:Number},
    Dew:{type:Number},
    ShippingCost:{type:Number},
    Cash:{type:Number},
    GrandTotal:{type:Number},
    Note:{type:String},
    CreatedDate:{type:Date,default:Date.now()}
},{versionKey:false});
const SalesModel=mongoose.model('sales',DataSchema);
module.exports=SalesModel
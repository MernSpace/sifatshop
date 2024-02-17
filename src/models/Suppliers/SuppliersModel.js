const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    UserEmail:{type:String},
    Name:{type:String},
    Address:{type:String},
    Phone:{type:String,unique:true},
    Email:{type:String},
    Dew:{type:Number, default:0},
    CreatedDate:{type:Date,default:Date.now()}
},{versionKey:false});
const SuppliersModel=mongoose.model('suppliers',DataSchema);
module.exports=SuppliersModel
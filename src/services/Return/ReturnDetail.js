
let returnModel = require('../../models/Returns/ReturnsModel')
const mongoose = require("mongoose");
const ReturnDetail =async (req)=>{
    try{
        let DetailsID=req.params.id;

        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject={};
        QueryObject['_id']=ObjectId(DetailsID);

        let join = {$lookup:{from:'customers',localField:"CustomerID",foreignField:"_id",as: "customer"}}
        let joinProduct = {$lookup:{from:'returnproducts',localField:"_id",foreignField:"ReturnID",as: "returnproduct"}}

        let UnwindCustomerStage={$unwind:"$customer"}



        let data = await returnModel.aggregate([
            {$match: QueryObject},
            join,
            joinProduct,
            UnwindCustomerStage

        ])
        return{status:"success",data:data,}
    }
    catch (e) {
        return {status:"fail",data:e.toString()}
    }
}


module.exports=ReturnDetail


let purchaseModel = require('../../models/Purchases/PurchasesModel')
const mongoose = require("mongoose");
const purchasesDetail =async (req)=>{
    try{
        let DetailsID=req.params.id;

        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject={};
        QueryObject['_id']=ObjectId(DetailsID);

        let join = {$lookup:{from:'suppliers',localField:"SupplierID",foreignField:"_id",as: "supplier"}}
        let joinProduct = {$lookup:{from:'purchaseproducts',localField:"_id",foreignField:"PurchaseID",as: "product"}}

        let UnwindSupplierStage={$unwind:"$supplier"}



        let data = await purchaseModel.aggregate([
            {$match: QueryObject},
            join,
            joinProduct,
            UnwindSupplierStage
        ])
       return{status:"success",data:data,}
    }
    catch (e) {
        return {status:"fail",data:e.toString()}
    }
}


module.exports=purchasesDetail

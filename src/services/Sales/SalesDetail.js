const mongoose = require("mongoose");
const salesModel = require('../../models/Sales/SalesModel')
const SaleDetailService= async (req)=>{
    try{
        let DetailsID=req.params.id;

        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject={};
        QueryObject['_id']=ObjectId(DetailsID);

        let join = {$lookup:{from:'customers',localField:"CustomerID",foreignField:"_id",as: "customer"}}
        let joinProduct = {$lookup:{from:'saleproducts',localField:"_id",foreignField:"SaleID",as: "salesproduct"}}
        let productDetail = {$lookup:{from:'products',localField:'salesproduct.ProductID',foreignField:"_id",as:"productsDetail"}}

        let UnwindCustomerStage={$unwind:"$customer"}



        let data = await salesModel.aggregate([
            {$match: QueryObject},
            join,
            joinProduct,
            productDetail,
            UnwindCustomerStage


        ])
        return{status:"success",data:data,}
    }
    catch (e) {
        return {status:"fail",data:e.toString()}
    }
 }


 module.exports=SaleDetailService;
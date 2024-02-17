const ParentModel = require("../../models/Purchases/PurchasesModel");
const ChildsModel = require("../../models/Purchases/PurchaseProductsModel");
const updateModel = require("../../models/Suppliers/SuppliersModel")
const CreateParentChildsService = require("../../services/purchases/purchasesService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildsService = require("../../services/common/DeleteParentChildsService");
const purchasesDetail = require("../../services/purchases/purchasesDetail");

exports.CreatePurchases=async (req, res) => {
    let Result= await CreateParentChildsService(req,ParentModel,ChildsModel,updateModel,'PurchaseID');
    res.status(200).json(Result)
}

exports.PurchasesList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let JoinStage={$lookup: {from: "suppliers", localField: "SupplierID", foreignField: "_id", as: "suppliers"}};
    let SearchArray=[{Note: SearchRgx},{'suppliers.Name': SearchRgx},{'suppliers.Address': SearchRgx},{'suppliers.Phone': SearchRgx},{'suppliers.Email': SearchRgx}]
    let Result=await ListOneJoinService(req,ParentModel,SearchArray,JoinStage);
    res.status(200).json(Result)
}

exports.detailPurchases =async (req,res)=>{
    let Result = await purchasesDetail(req)
    res.status(200).json(Result)
    }



exports.PurchasesDelete=async (req, res) => {
    let Result=await  DeleteParentChildsService(req,ParentModel,ChildsModel,'PurchaseID')
    res.status(200).json(Result)
}



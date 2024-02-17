const ParentModel = require("../../models/Returns/ReturnsModel");
const ChildsModel = require("../../models/Returns/ReturnProductsModel");
const updateModel = require('../../models/Customers/CustomersModel')
const CreateParentChildsService = require("../../services/Sales/SalesService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildsService = require("../../services/common/DeleteParentChildsService");
const ReturnDetail = require("../../services/Return/ReturnDetail");

exports.CreateReturns=async (req, res) => {
    let Result= await CreateParentChildsService(req,ParentModel,ChildsModel,updateModel,'ReturnID');
    res.status(200).json(Result)
}

exports.DetailReturns=async (req, res) => {
    let Result= await ReturnDetail(req);
    res.status(200).json(Result)
}


exports.ReturnsList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let JoinStage={$lookup: {from: "customers", localField: "CustomerID", foreignField: "_id", as: "customers"}};
    let SearchArray=[{Note: SearchRgx},{'customers.CustomerName': SearchRgx},{'customers.Address': SearchRgx},{'customers.Phone': SearchRgx},{'customers.Email': SearchRgx}]
    let Result=await ListOneJoinService(req,ParentModel,SearchArray,JoinStage);
    res.status(200).json(Result)
}

exports.ReturnDelete=async (req, res) => {
    let Result=await  DeleteParentChildsService(req,ParentModel,ChildsModel,'ReturnID')
    res.status(200).json(Result)
}



const mongoose = require("mongoose");

const CreatePrucasesChildsService= async (Request, ParentModel, ChildsModel,updateModel,JoinPropertyName) => {

    // Create Transaction Session
    const session = await mongoose.startSession();

    try{

        // Begin Transaction
        await session.startTransaction();

        // First Database Process
        let Parent=Request.body['Parent'];
        Parent.UserEmail=Request.headers['email'];
        let ParentCreation = await ParentModel.create([Parent],{ session });


        // Second Database Process
        let Childs=Request.body['Childs'];
        await Childs.forEach((element) => {
            element[JoinPropertyName] =ParentCreation[0]['_id'];
            element['UserEmail']=Request.headers['email'];
        });

        let ChildsCreation = await ChildsModel.insertMany(Childs,{ session });


        //update customer dew
        let customerID = Request.body['Parent']['SupplierID']
        let match = {_id:customerID}
        let update = Request.body['supplier'];
        let customer = await updateModel.updateOne(match,update);




        // Transaction Success
        await session.commitTransaction();
        session.endSession();

        return {status: "success", Parent: ParentCreation,Childs:ChildsCreation,customer:customer}


    }
    catch (error) {
        // Roll Back Transaction if Fail
        await session.abortTransaction();
        session.endSession();
        return {status: "fail", data: error}
    }
}
module.exports=CreatePrucasesChildsService
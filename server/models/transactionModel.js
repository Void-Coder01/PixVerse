import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId : {type : String, required : true},
    plan : {type : String, required: true},
    amount : {type : Number, required : true},
    credits : {type : Number, required : true},
    payment : {type : Boolean, default:false},
    data : {type : Number}

})

//first it will search for any existing user Model if yes it will proceed with that else it will create a new one 
const transactionModel = mongoose.models.user || mongoose.model("transaction", transactionSchema);

export default transactionModel;
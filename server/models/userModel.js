import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type : String, required: true},
    email : {type : String, required:true, unique : true},
    password : {type : String, required:true},
    creditBalance : {type : Number, default:5},
})

//first it will search for any existing user Model if yes it will proceed with that else it will create a new one 
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
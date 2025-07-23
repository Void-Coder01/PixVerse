import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

    const registerUser = async (req,res) => {
    try{
        const {name, email, password } = req.body;

        if(!name || !email || !password){
            return res.json({
                success:false,
                message: "missing details"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({
            success:true,
            token,
            user:{
                name : user.name
            }
        })
    }catch (error){
        console.log(error);
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

    const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        //find if exist
        if(!user){
            return res.status(404).json({
                success:false,
                message : "user does not exist"
            })
        }

         //match the passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
           
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

            res.json({
                success:true,
                token,
                user:{
                    name : user.name
                }
            })
        }else{
            return res.status(401).json({
                success:false,
                message : "Invalid Credentials"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

const userCredits = async(req,res) => {
    try {
        const {userID} = req.body;

        const user = await userModel.findById(userID)

        if(!user){
            res.status(404).json({
                success : false,
                msg : "UserId not found"
            })
        }

        res.json({
            success : true,
            credits : user.creditBalance,
            user : {
                name : user.name
            }
        })
    } catch (error) {
        console.log(error.message)
        res.status(501).json({
            success:false,
            msg : error.message
        })
    }
}


export {registerUser, loginUser, userCredits}

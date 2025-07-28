import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import razorpay from "razorpay"
import transactionModel from "../models/transactionModel.js";

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

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn:'2h'})

        return res.json({
            success:true,
            token,
            user:{
                name : user.name
            }
        })
    }catch (error){
        console.log(error);
        return res.status(500).json({
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
           
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn:'2h'})

            return res.json({
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
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const userCredits = async(req,res) => {
    try {
        const {userID} = req;

        const user = await userModel.findById(userID)

        if(!user){
            return res.status(404).json({
                success : false,
                msg : "UserId not found"
            })
        }

        return res.json({
            success : true,
            credits : user.creditBalance,
            user : {
                name : user.name
            }
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success:false,
            msg : error.message
        })
    }
}


const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})


const paymentRazorPay = async(req,res) => {
    try {
        const userID = req.userID;
        const planId = req.body.planId;

        const userData = await userModel.findById(userID);
        
        console.log(userID + "  "+ planId)
        
        if(!planId || !userID ){
            return res.json({
            success : false,
            message : "Missing Details"
            })
        }

        let credits, plan, amount, date;

        switch(planId) {
            case 'Basic' : 
                plan = "Basic"
                credits = 100
                amount = 10
                break

            case 'Advanced':
                plan = "Advanced"
                credits = 500
                amount = 50
                break

            case 'Business':
                plan = "Business"
                credits = 5000
                amount = 250
                break

            default:
                return res.json({
                    success : false,
                    message:"Plan not found"
                })
        }

        date = Date.now();

        const transactionData = {
            userID,
            plan,
            amount,
            credits,
            date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount : amount * 100,
            currency : process.env.CURRENCY,
            receipt : newTransaction._id
            
        }

        await razorpayInstance.orders.create(options, (error,order) => {
            if(error){
                console.log(error)
                return res.json({
                    success : false,
                    message : error.message
                })
            }

            return res.json({
                success : true,
                order
            })
        })
         
    } catch (error) {
        console.log(error);
        return res.json({
            success : false,
            message : error.message
        })
    }
}

export {registerUser, loginUser, userCredits, paymentRazorPay}

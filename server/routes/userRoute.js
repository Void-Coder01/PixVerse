import express, { Router } from "express";
import { registerUser, loginUser, userCredits, paymentRazorPay } from '../controllers/userController.js'
import userAuth from "../middleware/auth.js";

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits',userAuth , userCredits)
userRouter.post('/pay-razor',userAuth , paymentRazorPay)

export default userRouter;
import express, { Router } from "express";
import { registerUser, loginUser, userCredits } from '../controllers/userController.js'
import userAuth from "../middleware/auth.js";

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/credits',userAuth, userCredits)

export default userRouter;
import { Router } from "express";
import { registerUser, login } from "../controllers/users.controllers.js";

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(login);

export default userRouter;
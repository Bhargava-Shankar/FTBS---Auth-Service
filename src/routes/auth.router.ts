import { Router,Request,Response } from "express";
import myClient from "../utils/data-source";
import { hashPassword,comparePassword } from "../utils/crypt";
import { checkAccessToken, generateAccessToken } from "../utils/jwt";
import { jwtConfig } from "../config/config";
import UserService from "../services/user.service";
import { access } from "fs";
import authController from "../controllers/auth.controller"
import { TokenRequest, checkAuthToken } from "../middlewares/auth.middleware";

const router = Router()
const prisma = myClient.getInstance();


router.get("/resource", checkAuthToken ,(req: Request, res: Response) => {
    res.send(checkAccessToken(req.token));
})

//PAYLOAD: EMAIL AND PASSWORD
router.post("/login",authController.loginUser)

//PAYLOAD: firstName, lastName, email, password
router.post("/register",authController.registerUser)


export default router;
import { Request, Response } from "express"
import UserService from "../services/user.service";
import { comparePassword } from "../utils/crypt";
import { generateAccessToken } from "../utils/jwt";
import { AppError, errorResponse, successResponse } from "../utils/error";
import { error } from "console";
import { StatusCodes } from "http-status-codes";

const registerUser = async (req: Request, res: Response) => {

    const { email, password, firstName, lastName } = req.body;
    const userService = new UserService();
    const user = await userService.findUserAccount(email);
    if (!user) {
        //IF NO USER FOUND
        //CREATE USER ACCOUNT FOR AUTH PURPOSE
        try {
            const userId = await userService.createNewUserAccountGetId({
                email: email,
                password: password
            })
            console.log(userId);
            const userProfile = await userService.createNewUserProfile(userId, req.body);

            successResponse.data = userProfile;
            res.status(StatusCodes.ACCEPTED).send(successResponse);
        }
        catch (e) {
            if (e instanceof AppError) {
                errorResponse.message = e.message;
                res.status(e.statusCode).json(errorResponse)
                return
            }
            res.send(e)
        }
        return;
    }
    //USER ALREADY REGISTERED
    errorResponse.message = "User Already Exists"
    res.status(StatusCodes.CONFLICT).json(errorResponse)
    return;

}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userService = new UserService();
    const user = await userService.findUserAccount(email);
    if (!user) {
        res.send("EMAIL NOT REGISTERED")
        return
    }
    const result = comparePassword(password, user!['password']);
    if (result) {
        const accessToken = generateAccessToken(user['userId']
        )
        res.send({
            accessToken: accessToken
        });
    }
    else {
        res.send("WRONG PASSWORD");
    }
}

export default {registerUser,loginUser}
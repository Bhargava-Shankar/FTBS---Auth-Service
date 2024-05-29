import { Router,Request,Response } from "express";
import myClient from "../utils/data-source";
import { hashPassword,comparePassword } from "../utils/crypt";
import { checkAccessToken, generateAccessToken } from "../utils/jwt";
import { jwtConfig } from "../config/config";

const router = Router()
const prisma = myClient.getInstance();


router.get("/resource", (req: Request, res: Response) => {
    const bearer = req.headers['authorization']
    if (!bearer) {
        res.send("NOT ACCESS TOKEN")
        return
    }
    const accessToken = bearer.substring(7);
    res.send(checkAccessToken(accessToken));
})

router.post("/login", async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.userAccount.findUnique(
        {
            where: {
                email: email
            }
        }
    ) 
    if (!user) {
        res.send("EMAIL IS NOT REGISTERD")
        return;
    }
    const result = comparePassword(password, user!['password']);
    if (result) {
        const accessToken = generateAccessToken({
            userId: user['userId']
        })
        res.send(accessToken);
    }
    else {
        res.send("WRONG PASSWORD");
    }
})

router.post("/register", async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;
    
    const user = await prisma.userAccount.findUnique({ where: { email: email } });

    if (!user) {
        //IF NO USER FOUND
        //CREATE USER ACCOUNT FOR AUTH PURPOSE
        
        
        const userAccount = await prisma.userAccount.create({
            data: {
                email: req.body['email'],
                password: hashPassword(req.body['password']),//TODO: NEED TO ENCRYPT PASSWORD
            }
        }).then((data) => data).catch((err) => err);
        const userId = userAccount['userId'];
        console.log(userAccount);
     
        try {
            //CREATE USER PROFILE
            await prisma.userProfile.create({
                data: {
                    userId: userId,
                    email: email,
                    firstName: firstName,
                    lastName: lastName
                }
            })
            res.send("USER CREATED SUCCESSFULLY");
            //CREATE AND SEND ACCESS TOKEN 
            return;
        }
        catch (e) {
            res.send(e);
            return;
        }
    }
    //USER ALREADY REGISTERED
    res.send("USER ALREADY EXISTS");
    return;
    //HASHPASSWORD AND STORE
    //CREATE USER ACCOUNT
    //CREATE USER PROFILE
})



export default router;
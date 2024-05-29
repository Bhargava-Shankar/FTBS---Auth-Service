import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/config";

export function generateAccessToken(userId: string) {
    const secret = jwtConfig.SECRET;
    return jwt.sign({
        userId : userId
    }, secret ,{
        expiresIn: '24h',
        
    })
}

export function checkAccessToken(token: string) {
    try {
        var decoded = jwt.verify(token, jwtConfig.SECRET);
        console.log(decoded);
        return true;
    } catch (err) {
        // err
        return false;
    }

}
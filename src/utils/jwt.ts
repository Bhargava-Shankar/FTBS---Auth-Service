import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/config";

export function generateAccessToken(data: Object) {
    const secret = jwtConfig.SECRET;
    return jwt.sign(data, secret ,{
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
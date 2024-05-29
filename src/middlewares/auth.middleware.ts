
import { Request, Response, NextFunction } from "express"


export interface TokenRequest extends Request{
    token: string
}

export const checkAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers['authorization']
    if (!bearer) {
        res.send("NOT ACCESS TOKEN")
        return
    }
    req.token = bearer.substring(7);
    next();
}
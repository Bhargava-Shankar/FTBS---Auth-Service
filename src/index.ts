import { Request, Response } from "express"
import express from "express"
import dotenv from "dotenv"
import myClient from "./utils/data-source";
import routes from "./routes/index";
import cors from 'cors';

//EXTENDING REQUEST OBJECT VIA GOLBAL NAMESPACE
declare global {
    namespace Express {
        interface Request {
            token: string
        }
    }
}

dotenv.config();


const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);


//TODO: ADD RATE LIMITER
//TODO: ADD REVERSE PROXY FOR BOOKING SERVICE ALONE
const prisma = myClient.getInstance();


const PORT = process.env.AUTH_SERVICE_PORT
app.listen(3000, () => {
    console.log(`Auth Service Started at ${PORT}`);
})

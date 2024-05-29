import { Request, Response } from "express"
import express from "express"
import dotenv from "dotenv"
import myClient from "./utils/data-source";
import routes from "./routes/index";

dotenv.config();


const app = express();
app.use(express.json());
app.use(routes);
app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
})

//TODO: ADD RATE LIMITER
//TODO: ADD REVERSE PROXY FOR BOOKING SERVICE ALONE
const prisma = myClient.getInstance();


const PORT = process.env.AUTH_SERVICE_PORT
app.listen(3000, () => {
    console.log(`Auth Service Started at ${PORT}`);
})

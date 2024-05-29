import dotenv from "dotenv"
dotenv.config();
export const jwtConfig: {SECRET: string} = {
    SECRET: process.env.JWT_SECRET!
}
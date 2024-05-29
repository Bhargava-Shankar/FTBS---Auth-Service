import { StatusCodes } from "http-status-codes";
import myClient from "../utils/data-source";

const prisma = myClient.getInstance();
export class CrudRepository{
    model: any;
    constructor(model: any) {
        this.model = model
    }
    create(data: any) {
        this.model.create({
            data: data
        })
    }
}
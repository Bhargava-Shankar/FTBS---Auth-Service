import myClient from "../utils/data-source";
import { CrudRepository } from "./crud-repository";

const prisma = myClient.getInstance();

export class UserAccountRespository extends CrudRepository{
    constructor() {
        super(prisma.userAccount)
    }
    //data : {email, password}
    async createUserAccount(data: any){
        return await this.model.create({ data: data });
    }

    async findUserAccount(email: string) {
        return await this.model.findUnique({
            where: {
                email: email
            }
        })
    }
}
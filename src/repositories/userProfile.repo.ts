import myClient from "../utils/data-source";
import { CrudRepository } from "./crud-repository";

const prisma = myClient.getInstance();

export class UserProfileRespository extends CrudRepository {
    constructor() {
        super(prisma.userProfile)
    }
    //data : {userId, email, firstName, lastName}
    async createUserProfile(data: any) {
        return await this.model.create({ data: data });
    }
}
import { error } from "console";
import { UserAccountRespository } from "../repositories/userAccount.repo";
import { UserProfileRespository } from "../repositories/userProfile.repo";
import { hashPassword } from "../utils/crypt";
import { AppError } from "../utils/error";


const userAccountRepo = new UserAccountRespository();
const userProfileRepo = new UserProfileRespository();

class UserService{

    async createNewUserAccountGetId(data: any) {
        try {
            const userAccount = await userAccountRepo.createUserAccount({
                    email: data['email'],
                    password: hashPassword(data['password'])
             
            })
            return userAccount['userId'];
            //USER ID CAN BE NULL??
            
        }
        catch (e) {
            throw e
        }
    }

    async createNewUserProfile(userId:string,data: any) {
        try {
            return await userProfileRepo.createUserProfile({
                userId: userId,
                email: data['email'],
                firstName: data['firstName'],
                lastName: data['lastName']
            })
        }
        catch (e) {
            throw e
        }
    }

    async findUserAccount(email: string) {
        try {
            return await userAccountRepo.findUserAccount(email);
        }
        catch (e) {
            throw e;
        }
    }
}

export default UserService
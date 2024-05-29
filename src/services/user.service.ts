import { UserAccountRespository } from "../repositories/userAccount.repo";
import { UserProfileRespository } from "../repositories/userProfile.repo";


const userAccountRepo = new UserAccountRespository();
const userProfileRepo = new UserProfileRespository();

class UserService{

    async createNewUserAccount(data: any) {
        try {
            return await userAccountRepo.createUserAccount(data)
        }
        catch (e) {
            return e
        }
    }

    async createNewUserProfile(data: any) {
        try {
            return await userProfileRepo.createUserProfile(data)
        }
        catch (e) {
            return e
        }
    }

}
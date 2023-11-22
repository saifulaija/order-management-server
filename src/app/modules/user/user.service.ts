import { TUser } from "./user.interface";
import { UserModel } from "./user.model";


const createUserInToDB=async(userData:TUser)=>{
      const result = await UserModel.create(userData);
      return result
}

export const userService={
      createUserInToDB,
}
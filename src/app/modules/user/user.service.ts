import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserInToDB = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.aggregate([
    {
      $project: {
        userName: 1,
        fullName: 1,
        _id: 0,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

export const userService = {
  createUserInToDB,
  getAllUsersFromDB,
};

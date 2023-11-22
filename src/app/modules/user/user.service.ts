import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserInToDB = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find({}).select({
    password: 0,
  });

  return result;
};
const getSingleUserFromDB = async (id: string): Promise<TUser | null> => {
  const result = await UserModel.findById(id);
  return result;
};

export const userService = {
  createUserInToDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};

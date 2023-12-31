import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserInToDB = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find({}).select({
    userId: 0,
    password: 0,
    _id: 0,
    isActive: 0,
    hobbies: 0,
    orders: 0,
  });

  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const user = new UserModel();
  console.log(userId);

  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await UserModel.findOne({ userId });

  return result;
};

const deleteSingleUserFromDB = async (userId: number) => {
  const user = new UserModel();
  if (!(await user.isUserExists(userId))) {
    throw new Error('user not found');
  }
  const result = await UserModel.deleteOne({ userId });
  return result;
};

const updateSingleUserFromDB = async (
  userId: number,
  userData: TUser,
): Promise<TUser | null> => {
  const user = new UserModel();
  console.log(userId);

  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await UserModel.updateOne({ userId: userId }, userData, {
    new: true,
    runValidators: true,
  });

  if (result.modifiedCount > 0) {
    const updatedUser = await UserModel.findOne({ userId: userId });
    return updatedUser;
  } else {
    return null;
  }
};

const createOrderToDB = async (userId: number, orderData: TUser) => {
  const user = new UserModel();
  console.log(userId);

  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await UserModel.updateOne(
    {
      userId,
    },
    {
      $push: {
        orders: orderData,
      },
    },
  );

  return result;
};

const getAllOrderByUserFromDB = async (userId: number) => {
  const user = new UserModel();
  console.log(userId);

  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await UserModel.aggregate([
    { $match: { userId: userId } },
    { $project: { orders: 1, _id: 0 } },
  ]);

  return result;
};

const getTotalPriceOfOrdersFromDB = async (userId: number) => {
  const user = new UserModel();
  console.log(userId);

  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await UserModel.aggregate([
    { $match: { userId: userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: {
            $multiply: ['$orders.price', '$orders.quantity'],
          },
        },
      },
    },
    { $project: { _id: 0 } },
  ]);

  return result;
};

export const userService = {
  createUserInToDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUserFromDB,
  createOrderToDB,
  getAllOrderByUserFromDB,
  getTotalPriceOfOrdersFromDB,
};

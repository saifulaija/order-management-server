import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserInToDB = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  //  const user = new UserModel(userData)

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find({}).select({
    password: 0,
    _id: 0,
  });

  return result;
};
// const getSingleUserFromDB = async (userId: string) => {
//   const user= new UserModel()
//   if(await !user.isUserExists(userId)){
//     throw new Error ('user not found here')
//   }

//   const result = await UserModel.findOne({userId})

//   return result;
// };



const getSingleUserFromDB = async (userId: string) => {
  const user = new UserModel();
 console.log(userId)

  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await UserModel.findOne({ userId });

  return result;
};


// const deleteSingleUserFromDB=async(userId:string)=>{
//   const user = new UserModel()
//   if(await !user.isUserExists(userId)){
// throw new Error('user not found')

//   }
//   const result = await user.deleteOne({userId})
//   return result
// }

const deleteSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.deleteOne(userId);
  return result;
};

const updateSingleUserFromDB = async (userId: string, userData: TUser) => {
  const result = await UserModel.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const createOrderToDB = async (userId: string, orderData: TUser) => {
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

const getAllOrderByUserFromDB = async (userId: string) => {
  const result = await UserModel.aggregate([
    { $match: { userId: userId } },
    { $project: { orders: 1, _id: 0 } },
  ]);

  return result;
};


const getTotalPriceOfOrdersFromDB = async (userId: string) => {
  const result = await UserModel.aggregate([
    { $match: { userId: userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: '$_id',
        totalPrice: { $sum: '$orders.price' }
      },
     
    },
    {$project:{_id:0}}
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
  getTotalPriceOfOrdersFromDB
};

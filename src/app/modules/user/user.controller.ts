import { Request, Response } from 'express';
import { userService } from './user.service';

import UserZodSchema from './user.zod.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const  userData  = req.body;
    //validation by zod---------
    const zodParseData = UserZodSchema.parse(userData);

    const result = await userService.createUserInToDB(zodParseData);
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      message: 'something is went wrong',
      error: {
        error,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      message: 'something is went wrong',
      error: {
        error,
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 400,
        description: 'User not found!',
      },
    });
  }
};



const deleteSingleUser=async(req:Request, res:Response)=>{
  try {
    const {userId} = req.params;
    const result = await userService.deleteSingleUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
     data:result
    })
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: error.message,
      code: {
        code: 400,
        description: 'User not found!',
      },
    });
  }
}
const updateSingleUser=async(req:Request, res:Response)=>{
  try {
    const {userId} = req.params;
    const userData=req.body;
    const result = await userService.updateSingleUserFromDB(userId,userData)
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
     data:result
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 400,
        description: 'User not found!',
      },
    });
  }
}
const createOrder=async(req:Request, res:Response)=>{
  try {
    const {userId} = req.params;
    const orderData=req.body;

    console.log(userId, orderData)
    const result = await userService.createOrderToDB(userId,orderData)
    res.status(200).json({
      success: true,
      message: "order created successfully!",
     data:null
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 400,
        description: 'User not found!',
      },
    });
  }
}


const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.getAllOrderByUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Order faced successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 400,
        description: 'User not found!',
      },
    });
  }
};

const getTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.getTotalPriceOfOrdersFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 400,
        description: 'User not found!',
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  createOrder,
  getAllOrders,
  getTotalPriceOfOrders,
};

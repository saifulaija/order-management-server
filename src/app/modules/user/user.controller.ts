import { Request, Response } from 'express';
import { userService } from './user.service';

import UserZodSchema from './user.zod.validation';

import bcrypt from 'bcrypt';
import config from '../../config';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
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
    const  userId  = parseInt(req.params.userId);
    console.log(userId);

    const result = await userService.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const  userId  = parseInt(req.params.userId);
    const result = await userService.deleteSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      code: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const  userId  = parseInt(req.params.userId);
    const userData = req.body;
    const password = userData.password;
    if (password) {
      const hashedPassword = await bcrypt.hash(
        password,
        Number(config.bcrypt_salt_rounds),
      );
      userData.password = hashedPassword;
    }
    console.log(userData, userId);
    const result = await userService.updateSingleUserFromDB(userId, userData);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'field not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User update successfully!',
        data: result,
      });
    }
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

const createOrder = async (req: Request, res: Response) => {
  try {
    const  userId  = parseInt(req.params.userId);
    const orderData = req.body;

    console.log(userId, orderData);
    const result = await userService.createOrderToDB(userId, orderData);
    res.status(200).json({
      success: true,
      message: 'order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const  userId  = parseInt(req.params.userId);
    const result = await userService.getAllOrderByUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Order faced successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: {
        code: 400,
        description: 'User not found!',
      },
    });
  }
};

const getTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const  userId  = parseInt(req.params.userId);

    const result = await userService.getTotalPriceOfOrdersFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
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

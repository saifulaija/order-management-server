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
export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
};

import { Request, Response } from 'express';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await userService.createUserInToDB(userData);
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

export const userController = {
  createUser,
};

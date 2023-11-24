/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TUser = {
  userId: string;
  userName: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?:[{
    productName:string,
    price:number,
    quantity:number
  }]
};


//for static method

export type userMethods={
  isUserExists(userId:string):Promise<TUser | null>
}

export type customModel = Model<TUser, Record<string, never>, userMethods>;
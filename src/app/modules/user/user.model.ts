/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TUser, customModel, userMethods } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, customModel, userMethods>({
  userId: { type: Number, unique: true },
  username: {
    type: String,
    required: [true, 'user name is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    select: false,
  },
  fullName: {
    firstName: { type: String, required: [true, 'firstName is required'] },
    lastName: { type: String, required: [true, 'firstName is required'] },
  },
  age: { type: Number, required: [true, 'age is required'] },
  email: { type: String, required: [true, 'email is required'] },
  isActive: { type: Boolean },
  hobbies: {
    type: [String],

    default: [],
  },
  address: {
    street: { type: String, required: [true, 'street is required'] },
    city: { type: String, required: [true, 'city is required'] },
    country: { type: String, required: [true, 'country is required'] },
  },
  orders: [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//hide password for response

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.orders;
  return userObject;
};

//create a custom static method------

userSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

// userSchema.index({ userId: 1, username: 1 }, { unique: true });
export const UserModel1 = model<TUser, customModel>('User', userSchema);

//  Create a Model-------

export const UserModel = model<TUser, customModel>('User', userSchema);

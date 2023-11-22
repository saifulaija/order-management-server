import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  userId: { type: String, required: [true, 'Id is required'], unique: true },
  userName: { type: String, required: [true, 'userName is required'] },
  password: { type: String, required: [true, 'password is required'] },
  fullName: {
    firstName: { type: String, required: [true, 'firstName is required'] },
    lastName: { type: String, required: [true, 'firstName is required'] },
  },
  age: { type: Number, required: [true, 'age is required'] },
  email: { type: String, required: [true, 'email is required'] },
  isActive: { type: Boolean },
  hobbies: {
    type: [String],
    required: [true, 'hobbies is required'],
    default: [],
  },
  address: {
    street: { type: String, required: [true, 'street is required'] },
    city: { type: String, required: [true, 'city is required'] },
    country: { type: String, required: [true, 'country is required'] },
  },
});

// 3. Create a Model.

export const UserModel = model<TUser>('User', userSchema);

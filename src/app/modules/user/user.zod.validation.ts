import { z } from 'zod';

const FullNameSchema = z.object({
  firstName: z.string({
    required_error: 'first name is required',
  }),
  lastName: z.string({
    required_error: 'first name is required',
  }),
});

const AddressSchema = z.object({
  street: z.string({
    required_error: 'street is required',
  }),
  city: z.string({
    required_error: 'city is required',
  }),
  country: z.string({
    required_error: 'street is required',
  }),
});

export const UserZodSchema = z.object({
  userId: z.string({
      required_error:'user id is required'
  }),
  userName: z.string({
    required_error: 'userName is required',
    invalid_type_error: 'userName must be a string',
  }),
  password: z.string({
    required_error: 'password is required',
  }),
  fullName: FullNameSchema,
  age: z.number({
    required_error: 'age is required',
  }),
  email: z.string({
    required_error: 'email is required',
  }),
  isActive: z.boolean({
    required_error: 'isActive field is required',
  }),
  hobbies: z.array(z.string()).default([]),
  address: AddressSchema,
});

export default UserZodSchema;
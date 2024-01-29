import { User } from '/iam/users/users.schema';

export interface IUserResponse extends Omit<User, 'password'> {}

import { User } from 'firebase/auth';

export type UserModel = User & {
  isAdmin: boolean;
};

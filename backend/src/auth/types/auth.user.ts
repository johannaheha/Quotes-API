import { User } from 'src/users/entities/user.entity';

export interface AuthUser {
  userId: string;
  username: string;
  roles: string[];
}

export type SafeUser = Omit<User, 'password'>;

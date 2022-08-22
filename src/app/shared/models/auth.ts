import { User } from './user';

export interface Auth {
  user: User;
  accessToken: string | null;
  error?: string;
}

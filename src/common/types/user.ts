// user interface created for typescript to understand incoming data
export interface IUser {
  id?: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  mobile: number;
  is_blocked?: boolean;
  is_admin?: boolean;
  is_verified?: boolean;
}

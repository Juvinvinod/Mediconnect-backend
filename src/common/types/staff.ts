// staff interface created for typescript to understand incoming data
export interface IStaff {
  _id?: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  mobile: number;
  role: string;
  is_blocked?: boolean;
}

// doctor interface created for typescript to understand incoming data
export interface IDoctor {
  _id?: string;
  first_name: string;
  last_name: string;
  password: string;
  department: string;
  doctor_fees: string;
  email: string;
  mobile: number;
  role: string;
  is_blocked?: boolean;
}

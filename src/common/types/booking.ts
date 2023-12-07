// booking interface created for typescript to understand incoming data
export interface IBooking {
  _id?: string;
  doctor_id?: string;
  user_id?: string;
  payment: string;
  date: string | Date;
  start_time: string;
  end_time: string;
  fees: string;
  status?: string;
  patient_id?: string;
  prescription?: string;
}

// department interface created for typescript to understand incoming data
export interface IDept {
  _id?: string;
  dept_name: string;
  image: {
    public_id: string;
    url: string;
  };
}

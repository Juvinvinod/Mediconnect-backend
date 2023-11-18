import mongoose, { Document, Model, Schema } from 'mongoose';
import { IDept } from '../common/types/department';

//interface for doctor model
export interface DepartmentDoc extends Document {
  dept_name: string;
}

// let typescript know there is a statics method in userSchema
interface DepartmentModel extends Model<DepartmentDoc> {
  build(attrs: IDept): DepartmentDoc;
}

//doctor model
const deptSchema = new Schema({
  dept_name: {
    type: String,
    required: true,
  },
});

deptSchema.statics.build = (attrs: IDept) => {
  return new Department(attrs);
};

const Department = mongoose.model<DepartmentDoc, DepartmentModel>(
  'department',
  deptSchema
);

export { Department };

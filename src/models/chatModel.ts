import mongoose, { Document, Model, Schema } from 'mongoose';
import { IChat } from '../common/types/chat';

export interface ChatDoc extends Document {
  doctor_id?: string;
  user_id?: string;
  latest_message?: string;
}

// let typescript know there is a statics method in userSchema
interface ChatModel extends Model<ChatDoc> {
  build(attrs: IChat): ChatDoc;
}

//doctor model
const chatSchema = new Schema(
  {
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    latest_message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.statics.build = (attrs: IChat) => {
  return new Chat(attrs);
};

const Chat = mongoose.model<ChatDoc, ChatModel>('chat', chatSchema);

export { Chat };

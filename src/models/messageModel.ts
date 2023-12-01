import mongoose, { Document, Model, Schema } from 'mongoose';
import { IMessage } from '../common/types/message';

export interface MessageDoc extends Document {
  chat_id?: string;
  sender_id?: string;
  text: string;
}

// let typescript know there is a statics method in userSchema
interface MessageModel extends Model<MessageDoc> {
  build(attrs: IMessage): MessageDoc;
}

//doctor model
const messageSchema = new Schema({
  chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  },
  sender_id: {
    type: String,
  },
  text: {
    type: String,
  },
});

messageSchema.statics.build = (attrs: IMessage) => {
  return new Message(attrs);
};

const Message = mongoose.model<MessageDoc, MessageModel>(
  'message',
  messageSchema
);

export { Message };

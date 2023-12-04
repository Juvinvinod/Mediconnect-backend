import { NotFoundError } from '../common/errors/notFoundError';
import { IChat } from '../common/types/chat';
import { IMessage } from '../common/types/message';
import { Chat } from '../models/chatModel';
import { Message } from '../models/messageModel';
import { IChatRepository } from './interfaces/chatRepository.interface';

export class ChatRepository implements IChatRepository {
  async findChat(doctorID: string, userId: string): Promise<IChat[]> {
    return await Chat.find({
      user_id: userId,
      doctor_id: doctorID,
    }).populate([
      {
        path: 'user_id',
        model: 'user',
      },
      {
        path: 'doctor_id',
        model: 'doctor',
      },
    ]);
  }

  //create new chat
  async newChat(chatDetails: IChat) {
    const chat = Chat.build(chatDetails);
    return await chat.save();
  }

  //get all user chats
  async getChats(_id: string) {
    return await Chat.find({ user_id: _id });
  }

  // create a message
  async createMessage(data: IMessage): Promise<IMessage> {
    const message = Message.build(data);
    return await message.save();
  }

  //find a message
  async findMessage(_id: string): Promise<IMessage[]> {
    if (_id) {
      return await Message.find({ _id: _id }).populate({
        path: 'chat_id',
        model: 'chat',
      });
    } else {
      throw new NotFoundError('ID not found');
    }
  }

  //update latest Message
  async updateMessage(id: string, content: string) {
    await Chat.findByIdAndUpdate({ _id: id }, { latest_message: content });
  }

  //get all messages
  async allMessages(_id: string) {
    return await Message.find({ chat_id: _id });
  }

  //get all chats belonging to doctor
  async doctorChats(id: string) {
    return await Chat.find({ doctor_id: id }).populate([
      {
        path: 'user_id',
        model: 'user',
      },
      {
        path: 'doctor_id',
        model: 'doctor',
      },
    ]);
  }
}

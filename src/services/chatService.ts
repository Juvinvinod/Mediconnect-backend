import { IChat } from '../common/types/chat';
import { IMessage } from '../common/types/message';
import { ChatRepository } from '../repositories/chatRepository';
import { IChatService } from './interfaces/chatService.interface';

const chatRepository = new ChatRepository();

export class ChatService implements IChatService {
  async createChat(chatDetails: IChat) {
    const user_id = chatDetails.user_id;
    const doctor_id = chatDetails.doctor_id;
    if (user_id && doctor_id) {
      console.log(user_id);
      console.log(doctor_id);
      await chatRepository.newChat(chatDetails);
      return await chatRepository.findChat(doctor_id, user_id);
    }
  }

  //find the user doctor chat
  async getChat(userId: string, doctorId: string) {
    return await chatRepository.findChat(userId, doctorId);
  }

  //get all user chats
  async getAllChat(_id: string) {
    return await chatRepository.getChats(_id);
  }

  //create a new message
  async createMessage(data: IMessage) {
    const document = await chatRepository.createMessage(data);
    if (document?._id) {
      await chatRepository.updateMessage(data.chat_id, data.text);
      console.log('hi');
      return await chatRepository.findMessage(document._id);
      // return document.populate({ path: 'chat_id', model: 'chat' });
    }
  }

  //get all messages
  async getMessages(_id: string) {
    return await chatRepository.allMessages(_id);
  }

  //get doctor chats
  async getDocChats(id: string) {
    return await chatRepository.doctorChats(id);
  }
}

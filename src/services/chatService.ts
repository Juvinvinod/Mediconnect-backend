import { IChat } from '../common/types/chat';
import { IMessage } from '../common/types/message';
import { ChatRepository } from '../repositories/chatRepository';

const chatRepository = new ChatRepository();

export class ChatService {
  async createChat(chatDetails: IChat) {
    console.log(chatDetails);

    return await chatRepository.newChat(chatDetails);
  }

  //find the user doctor chat
  async getChat(userId: string, doctorId: string) {
    console.log(userId);
    console.log(doctorId);

    return await chatRepository.findChat(userId, doctorId);
  }

  //get all user chats
  async getAllChat(_id: string) {
    return await chatRepository.getChats(_id);
  }

  //create a new message
  async createMessage(data: IMessage) {
    const document = await chatRepository.createMessage(data);
    if (document) {
      await chatRepository.updateMessage(data.chat_id, data.text);
      console.log('hi');

      return document.populate({ path: 'chat_id', model: 'chat' });
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

import { IChat } from '../../common/types/chat';
import { IMessage } from '../../common/types/message';

export interface IChatService {
  createChat(chatDetails: IChat): Promise<IChat[] | undefined>;
  getChat(userId: string, doctorId: string): Promise<IChat[] | null>;
  getAllChat(_id: string): Promise<IChat[] | null>;
  createMessage(data: IMessage): Promise<IMessage[] | undefined>;
  getMessages(_id: string): Promise<IMessage[] | null>;
  getDocChats(id: string): Promise<IChat[] | null>;
}

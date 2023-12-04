import { IChat } from '../../common/types/chat';
import { IMessage } from '../../common/types/message';

export interface IChatRepository {
  findChat(doctorID: string, userId: string): Promise<IChat[] | null>;
  newChat(chatDetails: IChat): Promise<IChat | null>;
  getChats(_id: string): Promise<IChat[] | null>;
  createMessage(data: IMessage): Promise<IMessage | null>;
  updateMessage(id: string, content: string): Promise<void>;
  allMessages(_id: string): Promise<IMessage[] | null>;
  doctorChats(id: string): Promise<IChat[] | null>;
  findMessage(_id: string): Promise<IMessage[]>;
}

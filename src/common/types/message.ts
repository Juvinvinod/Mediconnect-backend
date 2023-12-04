// message interface created for typescript to understand incoming data
export interface IMessage {
  _id?: string;
  chat_id: string;
  sender_id: string;
  text: string;
}

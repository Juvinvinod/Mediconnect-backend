import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../common/errors/badRequestError';
import { ChatService } from '../services/chatService';
import { IMessage } from '../common/types/message';
import { IChatController } from './interfaces/chatController.interface';

const chatService = new ChatService();

export class ChatController implements IChatController {
  // check if a chat already exists else create a new chat
  accessChat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { docId } = req.body as { docId: string };
      const id = (req.body as { _id?: string })?._id;
      if (!docId || !id) {
        throw new BadRequestError('docId not provided');
      } else {
        const document = await chatService.getChat(docId, id);

        if (document.length > 0) {
          res.status(200).send(document);
        } else {
          const chat = await chatService.createChat({
            doctor_id: docId,
            user_id: id,
          });
          res.status(200).send(chat);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //get all the chats belonging to the user
  getUserChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const _id = (req.body as { _id?: string })?._id;
      if (!_id) {
        throw new BadRequestError('Id not provided');
      } else {
        const documents = await chatService.getAllChat(_id);
        res.status(200).send(documents);
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  createMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const body = req.body as IMessage;

      const chatId = body.chat_id;
      const _id = (req.body as { _id?: string })?._id;
      const content = body.text;
      if (!_id || !chatId) {
        throw new BadRequestError('Id/chat id not provided');
      } else {
        const document = await chatService.createMessage({
          chat_id: chatId,
          sender_id: _id,
          text: content,
        });
        res.status(200).send(document);
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //get all messages
  getMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const chatId = req.params.chatId;
      const documents = await chatService.getMessages(chatId);
      res.status(200).send(documents);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };

  //get all chats belonging to doctor
  getDocChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const _id = (req.body as { _id?: string })?._id;
      if (!_id) {
        throw new BadRequestError('Id/chat id not provided');
      } else {
        const documents = await chatService.getDocChats(_id);
        res.status(200).send(documents);
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  };
}

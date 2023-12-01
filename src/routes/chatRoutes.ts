import { Router } from 'express';
import { verifyToken } from '../middlewares/tokenChecker';
import { ChatController } from '../controllers/chatController';

const chatController = new ChatController();
const router = Router();

router.get('/allDoctorChats', verifyToken, chatController.getDocChats);
router.post('/', verifyToken, chatController.accessChat); //create new chat
router.get('/user/:id', verifyToken, chatController.getUserChats); //get all chats belonging to the id
router.post('/messages', verifyToken, chatController.createMessage); // create a new message
router.get('/messages/:chatId', verifyToken, chatController.getMessages); // get all messages

export default router;

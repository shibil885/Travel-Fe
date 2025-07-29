import { MessageSenderType } from "../../enum/messageSenderType.enum";

export interface IMessage {
  chatId: string;
  senderId: string;
  senderType: MessageSenderType
  content?: string;
  imageUrl?: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

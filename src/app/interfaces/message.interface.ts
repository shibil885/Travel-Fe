import { MessageSenderType } from "../enum/messageSenderType.enum";

export interface IMessage {
  chatId: string; // Reference to the associated chat
  senderId: string; // ID of the sender (user or agency)
  senderType: MessageSenderType; // Type of the sender
  content?: string; // Text content of the message
  imageUrl?: string; // URL for an optional image
  isRead: boolean; // Read/unread status of the message
  createdAt?: Date; // Timestamp of when the message was created
  updatedAt?: Date; // Timestamp of when the message was last updated
}

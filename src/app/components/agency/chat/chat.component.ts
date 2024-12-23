import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { IChat } from '../../../interfaces/chat.interface';
import { IMessage } from '../../../interfaces/message.interface';
import { ChatService } from '../../../shared/services/chat/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageSenderType } from '../../../enum/messageSenderType.enum';
import { ChatListModalComponent } from '../../../shared/components/chat-list-modal/chat-list-modal.component';
import { IAgency } from '../../../models/agency.model';
import { IUser } from '../../../models/user.model';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../../shared/services/socket/socket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  chats: IChat[] = [];
  recentChats: IChat[] = [];
  messages: IMessage[] = [];
  modalImage: string | null = null;
  selectedChat!: IChat;
  isMobile: boolean = false;
  showChatWindow: boolean = false;
  newMessage = '';
  constructor(
    private _chatService: ChatService,
    private _socketService: SocketService,
    private _dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log('agency chat opened');
    this.checkScreenSize();
    this._fetchChats();
    this._socketService.receiveMessages().subscribe((res: IMessage) => {
      this._fetchChats();
      console.log('response entered from agency', res);
      this.messages.push(res);
    });
    this._socketService.userReadAllMessages().subscribe((res) => {
      this._fetchMessages(res.chatId);
    });
  }

  private _fetchChats() {
    this._chatService.getAllChats(MessageSenderType.AGENCY).subscribe((res) => {
      this.chats = res.chats;
      this.recentChats = res.chats.filter((chat) => chat.lastMessageId);
      const chatId = this.chats.map((chat) => chat._id);
      this._socketService.joinRooms(chatId);
    });
  }

  private _fetchMessages(chatId: string) {
    this._chatService.getAllMessages(chatId).subscribe((res) => {
      if (res.success) {
        this.messages = res.messages;
        this._fetchChats();
      }
    });
  }

  openImageModal(imageUrl: string) {
    this.modalImage = imageUrl;
  }

  closeImageModal() {
    this.modalImage = null;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.showChatWindow = false;
    }
  }

  selectChat(chat: IChat) {
    this._makeAllMessageAsRead(chat._id);
    this.selectedChat = chat;
    this._fetchMessages(this.selectedChat._id);
    if (this.isMobile) {
      this.showChatWindow = true;
    }
  }

  backToChatList() {
    this.showChatWindow = false;
  }

  onSendMessage() {
    this._chatService
      .addMessage(this.selectedChat._id, this.newMessage)
      .subscribe((res) => {
        if (res.success) {
          this.newMessage = '';
          this._fetchChats();
          this._fetchMessages(this.selectedChat._id);
        }
      });
  }
  // uploadImage(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.messages.push({
  //         sender: 'me',
  //         content: '',
  //         imageUrl: reader.result as string,
  //         timestamp: new Date().toLocaleTimeString([], {
  //           hour: '2-digit',
  //           minute: '2-digit',
  //         }),
  //       });
  //     };
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }

  onAddNewChat() {
    const dialogRef = this._dialog.open(ChatListModalComponent, {
      width: '380px',
      panelClass: 'custom-dialog-container',
      position: {
        left: '50px',
        top: '110px',
      },
    });

    dialogRef
      .afterClosed()
      .subscribe(
        (user: { user: IAgency | IUser; userType: MessageSenderType }) => {
          if (user) {
            this._handleSelectedUser(user.user, user.userType);
          }
        }
      );
  }

  private _handleSelectedUser(
    selectedUser: IUser | IAgency,
    userType: MessageSenderType
  ) {
    if (userType === MessageSenderType.USER) {
      const isExistingInChat = this.chats.filter((user) => {
        return user.agencyId._id === selectedUser._id;
      });
      if (isExistingInChat.length > 0) {
        this.selectChat(isExistingInChat[0]);
      } else {
        this._chatService
          .initializeChat(selectedUser._id, userType)
          .subscribe((res) => {
            this._fetchChats();
            this.selectChat(res.chat);
          });
      }
    }
  }
  private _makeAllMessageAsRead(chatId: string) {
    return this._chatService.makeAllMessageAsRead(chatId, 'agency').subscribe();
  }
}

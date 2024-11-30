import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatListModalComponent } from '../../../shared/components/chat-list-modal/chat-list-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { IChat } from '../../../interfaces/chat.interface';
import { IMessage } from '../../../interfaces/message.interface';
import { IUser } from '../../../models/user.model';
import { IAgency } from '../../../models/agency.model';
import { MessageSenderType } from '../../../enum/messageSenderType.enum';
import { ChatService } from '../../../shared/services/chat/chat.service';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [HeaderSidebarComponent, CommonModule, FormsModule],
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

  constructor(private _chatService: ChatService, private _dialog: MatDialog) {}

  ngOnInit() {
    this.checkScreenSize();
    this._fetchChats();
  }

  private _fetchChats() {
    this._chatService.getAllChats(MessageSenderType.USER).subscribe((res) => {
      this.chats = res.chats;
      this.recentChats = res.chats.filter((chat) => chat.lastMessageId);
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
    console.log('selected chat ---------->', chat);
    this.selectedChat = chat;
    if (this.isMobile) {
      this.showChatWindow = true;
    }
  }

  backToChatList() {
    this.showChatWindow = false;
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
    if (userType === MessageSenderType.AGENCY) {
      const isExistingInChat = this.chats.filter((user) => {
        return user.agencyId._id === selectedUser._id;
      });
      if (isExistingInChat.length > 0) {
        this.selectChat(isExistingInChat[0]);
      } else {
        this._chatService
          .initializeChat(selectedUser._id, userType)
          .subscribe((res) => {
            this.selectChat(res.chat);
          });
      }
    }
  }
}

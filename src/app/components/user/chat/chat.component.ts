import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatListModalComponent } from '../../../shared/components/chat-list-modal/chat-list-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  chats = [
    {
      name: 'Alice',
      avatar: 'https://via.placeholder.com/50',
      lastMessage: 'Hey, how are you?',
      time: '10:30 AM',
      imageUrl: '',
    },
    {
      name: 'Bob',
      avatar: 'https://via.placeholder.com/50',
      lastMessage: 'See you tomorrow!',
      time: 'Yesterday',
      imageUrl: '',
    },
  ];
  // chats: {
  //   name: string;
  //   avatar: string;
  //   lastMessage: string;
  //   time: string;
  //   imageUrl: string;
  // }[] = [];
  modalImage: string | null = null;
  selectedChat: any = this.chats[0];
  isMobile: boolean = false;
  showChatWindow: boolean = false;
  // messages = [
  //   { sender: 'me', content: 'Hi Alice!', timestamp: '10:30 AM', imageUrl: '' },
  //   {
  //     sender: 'Alice',
  //     content: 'Hey, how are you?',
  //     timestamp: '10:32 AM',
  //     imageUrl: '',
  //   },
  // ];
  messages: {
    sender: string;
    content: string;
    timestamp: string;
    imageUrl: string;
  }[] = [];
  newMessage = '';

  constructor(private _dialog: MatDialog) {}

  openImageModal(imageUrl: string) {
    this.modalImage = imageUrl;
  }

  // Method to close the modal
  closeImageModal() {
    this.modalImage = null;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.showChatWindow = false;
    }
  }

  selectChat(chat: any) {
    this.selectedChat = chat;
    if (this.isMobile) {
      this.showChatWindow = true;
    }
  }

  backToChatList() {
    this.showChatWindow = false;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        sender: 'me',
        content: this.newMessage,
        imageUrl: '',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
      this.newMessage = '';
    }
  }
  uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.messages.push({
          sender: 'me',
          content: '',
          imageUrl: reader.result as string,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  onAddNewChat() {
    this._dialog.open(ChatListModalComponent, {
      width: '380px',
      // data: user,
      panelClass: 'custom-dialog-container',
      hasBackdrop: true,
      disableClose: false,
      position: {
        left: '50px',
        top: '110px',
      },
    });
  }
}

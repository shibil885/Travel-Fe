import { Component } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { IAgency } from '../../../models/agency.model';
import { IUser } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-list-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-list-modal.component.html',
  styleUrls: ['./chat-list-modal.component.css'],
})
export class ChatListModalComponent {
  users: (IAgency | IUser)[] = [];
  colors: string[] = ['#ff6b54', '#34a853', '#4285f4', '#fbbc05'];

  constructor(
    private _chatService: ChatService,
    private _dialogRef: MatDialogRef<ChatListModalComponent>
  ) {}

  ngOnInit(): void {
    this.fetchAgencies();
  }

  fetchAgencies(): void {
    this._chatService.agenciesToChat().subscribe((res) => {
      this.users = res.agencies;
    });
  }

  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }
  isUser(user: IAgency | IUser): user is IUser {
    return (user as IUser).username !== undefined;
  }
  onSelectUser(user: any) {
      this._dialogRef.close(user);
  }
}

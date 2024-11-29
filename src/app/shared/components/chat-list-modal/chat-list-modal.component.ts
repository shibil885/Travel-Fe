import { Component } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { IAgency } from '../../../models/agency.model';
import { IUser } from '../../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-list-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-list-modal.component.html',
  styleUrls: ['./chat-list-modal.component.css'], // Fix typo in `styleUrl`
})
export class ChatListModalComponent {
  users: (IAgency | IUser)[] = [];

  constructor(private _chatService: ChatService) {}

  ngOnInit(): void {
    this.fetchAgencies();
  }

  fetchAgencies(): void {
    console.log('Fetching agencies...');
    this._chatService.agenciesToChat().subscribe((res) => {
      console.log('Agencies -->', res);
      this.users = res.agencies;
    });
  }

  isUser(user: IAgency | IUser): user is IUser {
    return (user as IUser).username !== undefined;
  }
}

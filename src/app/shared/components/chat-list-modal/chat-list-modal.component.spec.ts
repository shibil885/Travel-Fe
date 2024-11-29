import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListModalComponent } from './chat-list-modal.component';

describe('ChatListModalComponent', () => {
  let component: ChatListModalComponent;
  let fixture: ComponentFixture<ChatListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatListModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

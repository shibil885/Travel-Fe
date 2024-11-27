import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentBookingComponent } from './recent-booking.component';

describe('RecentBookingComponent', () => {
  let component: RecentBookingComponent;
  let fixture: ComponentFixture<RecentBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBookedComponent } from './single-booked.component';

describe('SingleBookedComponent', () => {
  let component: SingleBookedComponent;
  let fixture: ComponentFixture<SingleBookedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleBookedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

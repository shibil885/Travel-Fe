import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTravellingsComponent } from './current-travellings.component';

describe('CurrentTravellingsComponent', () => {
  let component: CurrentTravellingsComponent;
  let fixture: ComponentFixture<CurrentTravellingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentTravellingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentTravellingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAgencyComponent } from './single-agency.component';

describe('SingleAgencyComponent', () => {
  let component: SingleAgencyComponent;
  let fixture: ComponentFixture<SingleAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleAgencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

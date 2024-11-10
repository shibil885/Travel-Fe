import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAndSideBarComponent } from './header-and-side-bar.component';

describe('HeaderAndSideBarComponent', () => {
  let component: HeaderAndSideBarComponent;
  let fixture: ComponentFixture<HeaderAndSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAndSideBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderAndSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

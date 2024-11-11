import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSidebarComponent } from './header-and-side-bar.component';

describe('HeaderSidebarComponent', () => {
  let component: HeaderSidebarComponent;
  let fixture: ComponentFixture<HeaderSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

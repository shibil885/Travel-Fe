import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTableComponent } from './table.component';

describe('TableComponent', () => {
  let component: ReusableTableComponent;
  let fixture: ComponentFixture<ReusableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReusableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

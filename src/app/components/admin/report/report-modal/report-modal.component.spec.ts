import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailDialogComponent } from './report-modal.component';

describe('ReportModalComponent', () => {
  let component: ReportDetailDialogComponent;
  let fixture: ComponentFixture<ReportDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportDetailDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

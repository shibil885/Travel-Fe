import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePackageComponent } from './single-package.component';

describe('SinglePackageComponent', () => {
  let component: SinglePackageComponent;
  let fixture: ComponentFixture<SinglePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePackageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinglePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

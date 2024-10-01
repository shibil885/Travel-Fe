import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { adminAuthGuardFn } from './admin-guard.guard';


describe('adminGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminAuthGuardFn(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

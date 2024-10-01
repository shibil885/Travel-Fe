import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { agencyAuthGuardFn } from './agency-guard.guard';


describe('agencyGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => agencyAuthGuardFn(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

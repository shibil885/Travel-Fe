import { TestBed } from '@angular/core/testing';

import { AgencyAuthService } from './agency-auth.service';

describe('AgencyAuthService', () => {
  let service: AgencyAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

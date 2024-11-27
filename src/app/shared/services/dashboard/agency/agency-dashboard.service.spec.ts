import { TestBed } from '@angular/core/testing';

import { AgencyDashboardService } from './agency-dashboard.service';

describe('AgencyDashboardService', () => {
  let service: AgencyDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

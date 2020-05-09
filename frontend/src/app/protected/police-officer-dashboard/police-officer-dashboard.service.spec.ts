import { TestBed } from '@angular/core/testing';

import { PoliceOfficerDashboardService } from './police-officer-dashboard.service';

describe('PoliceOfficerDashboardService', () => {
  let service: PoliceOfficerDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliceOfficerDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

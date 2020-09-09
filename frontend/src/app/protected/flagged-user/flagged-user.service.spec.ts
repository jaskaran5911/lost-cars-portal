import { TestBed } from '@angular/core/testing';

import { FlaggedUserService } from './flagged-user.service';

describe('FlaggedUserService', () => {
  let service: FlaggedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlaggedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

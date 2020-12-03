import { TestBed } from '@angular/core/testing';

import { AttitudeDataService } from './attitude-data.service';

describe('AttitudeDataService', () => {
  let service: AttitudeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttitudeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

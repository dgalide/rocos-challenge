import { TestBed } from '@angular/core/testing';

import { RcClientService } from './rc-client.service';

describe('RcClientService', () => {
  let service: RcClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RcClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

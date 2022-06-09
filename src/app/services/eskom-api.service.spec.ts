import { TestBed } from '@angular/core/testing';

import { EskomApiService } from './eskom-api.service';

describe('EskomApiService', () => {
  let service: EskomApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EskomApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

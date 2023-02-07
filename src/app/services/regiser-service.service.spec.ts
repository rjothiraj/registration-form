import { TestBed } from '@angular/core/testing';

import { RegiserServiceService } from './regiser-service.service';

describe('RegiserServiceService', () => {
  let service: RegiserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegiserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

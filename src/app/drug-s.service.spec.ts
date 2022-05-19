import { TestBed } from '@angular/core/testing';

import { DrugSService } from './drug-s.service';

describe('DrugSService', () => {
  let service: DrugSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

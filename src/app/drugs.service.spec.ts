import { TestBed } from '@angular/core/testing';

import { DrugsService } from './drugs.service';

describe('DrugsService', () => {
  let service: DrugsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

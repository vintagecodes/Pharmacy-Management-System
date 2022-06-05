import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SearchDrugsService } from './search-drugs.service';

describe('SearchDrugsService', () => {
  let service: SearchDrugsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(SearchDrugsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

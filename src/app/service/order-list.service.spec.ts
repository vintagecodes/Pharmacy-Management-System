import { TestBed } from '@angular/core/testing';

import { OrderListService } from './order-list.service';

describe('OrderListService', () => {
  let service: OrderListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

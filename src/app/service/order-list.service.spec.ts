import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OrderListService } from './order-list.service';

describe('OrderListService', () => {
  let service: OrderListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule]
    });
    service = TestBed.inject(OrderListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

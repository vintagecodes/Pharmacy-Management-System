import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { DrugSService } from './drug-s.service';

describe('DrugSService', () => {
  let service: DrugSService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [DrugSService, HttpClient]
    });
    httpTestController = TestBed.inject(HttpTestingController);
    service = TestBed.get(DrugSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getDrugsList should make a get Request',()=>{

    const drugs = {
      result: [],
      next_page: true,
    };

    service.getDrugslist().subscribe(resp =>{
      expect(resp).toEqual(drugs);
    });

    const dataAPI = `${service.API}`;
    const req = httpTestController.expectOne(`${dataAPI+'/drugs/list'}`);

    expect(req.request.method).toEqual('GET');

    req.flush(drugs);

  });




});

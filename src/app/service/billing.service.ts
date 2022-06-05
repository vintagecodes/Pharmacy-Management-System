import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'src/app/models/address';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  API_URL = 'http://localhost:7000/address/'

  constructor(private http: HttpClient) { }

  postAddress(address: Address){
    return this.http.post<any>(this.API_URL, address);
  }
}

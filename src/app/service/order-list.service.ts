import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {

  constructor(private http: HttpClient) { }

  ORDER_URL = 'http://localhost:7000/user/get';

  ORDER_UPDATE_URL = 'http://localhost:7000/user/';



  getOrderList(){
    return this.http.get(this.ORDER_URL);
  }

  updateOrderDetails(order:any, id:string){
    return this.http.put(this.ORDER_UPDATE_URL+id,order);
  }

  getOrderDetailsByOrderId(orderId:string){
    return this.http.get(this.ORDER_UPDATE_URL+orderId);
  }
}

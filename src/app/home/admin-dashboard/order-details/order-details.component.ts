import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderListService } from 'src/app/service/order-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderList:any = [];
  orderId: any;
  p = 1;
  count = 5;
  searchText:any;

  constructor(private orderListService: OrderListService, private router: Router) { this.getOrderList() }


  OrderToUpdate = {
    orderId: "",
    userId:"",
    cart: "",
    total:"",
    orderStatus: "",
  }

  ngOnInit(): void { }

  getOrderList(){
    this.orderListService.getOrderList().subscribe((data) => {
      console.log(data);
      this.orderList = data;
    });
  }

  edit(order:any){
    this.OrderToUpdate=order;
    console.log(this.OrderToUpdate);
    }

  updateOrder(updatedForm:NgForm){

    const orderId = this.OrderToUpdate.orderId;
    console.log(updatedForm.value);
    this.orderListService.updateOrderDetails(updatedForm.value, orderId).subscribe((data)=>{
      console.log(data);
    })
    Swal.fire('Good Work!','The OrderList Has been Updated','success');
    window.location.reload();

  }

  getParticularDetails(order: any){
    this.router.navigate(['/order-details',order.orderId]);
    
  }


}




// this.orderId = order.orderId;
// this.orderListService.getOrderDetailsByOrderId(this.orderId).subscribe((data)=>{
//   console.log(data);
// })
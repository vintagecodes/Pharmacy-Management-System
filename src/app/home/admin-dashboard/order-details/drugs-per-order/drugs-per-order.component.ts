import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderListService } from 'src/app/service/order-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drugs-per-order',
  templateUrl: './drugs-per-order.component.html',
  styleUrls: ['./drugs-per-order.component.scss']
})
export class DrugsPerOrderComponent implements OnInit {
  public orderId: any;
  public list: any
  lists:any;
  res: any[] = [];

  constructor(private route: ActivatedRoute,private orderListService: OrderListService) {  }

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('orderId');
    this.orderId = id;

    this.getListPerOrderId(this.orderId)

  }

  getListPerOrderId(orderId:any){
    this.orderListService.getOrderDetailsByOrderId(orderId).subscribe((data)=>{
    // console.log(data);
    this.list = data;
    console.log(this.list);
    // this.lists = Object.values(this.list);
    // console.log(this.lists[2][0]['drugsCost']);

    this.res.push(this.list);
    console.log(this.res);
})


  }





  confirmStatus(orderStatus:string){
   
    console.log(this.res);

    if(orderStatus === 'confirmed'){
      Swal.fire('Hey!','The Order status has already been confirmed','warning');
    }
    else{
      orderStatus = 'confirmed';
      
    let order = new Order(this.res[0]['orderId'], this.res[0]['userId'], this.res[0]['cart'],this.res[0]['total'], orderStatus,this.res[0]['address']);
    console.log(order);
    this.orderListService.updateOrderDetails(order, order.orderId).subscribe((data)=>{
      console.log(data);
    });
    
    setTimeout(function(){
      Swal.fire('Yeah!','Order Verified','success'); 
      // window.location.reload()
   }, 1000);
  }





    // window.location.reload();
    
    

  }


  cancel(orderStatus:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cancelOrder(orderStatus);
        window.location.reload();
        
      }
    })
  }






  cancelOrder(orderStatus:string){
   
    console.log(this.res);

    if(orderStatus === 'cancelled'){
      Swal.fire('Hey!','The Order status has already been cancelled','warning');
    }
    else{
      orderStatus = 'cancelled';
      
    let order = new Order(this.res[0]['orderId'], this.res[0]['userId'], this.res[0]['cart'],this.res[0]['total'], orderStatus,this.res[0]['address']);
    console.log(order);
    this.orderListService.updateOrderDetails(order, order.orderId).subscribe((data)=>{
      console.log(data);
    });
    
    setTimeout(function(){
      Swal.fire('Hey!','Order cancelled','warning'); 
      // window.location.reload()
   }, 1000);
  }





    // window.location.reload();
    
    

  }

  


}

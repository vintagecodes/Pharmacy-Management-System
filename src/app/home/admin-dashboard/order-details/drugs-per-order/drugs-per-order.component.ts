import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderListService } from 'src/app/service/order-list.service';

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
    this.orderListService.getOrderDetailsByOrderId(this.orderId).subscribe((data)=>{
    // console.log(data);
    this.list = data;
    console.log(this.list);
    // this.lists = Object.values(this.list);
    // console.log(this.lists[2][0]['drugsCost']);

    this.res.push(this.list);
    console.log(this.res);
})


  }

  


}

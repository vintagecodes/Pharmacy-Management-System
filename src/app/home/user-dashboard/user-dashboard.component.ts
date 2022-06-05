import { Component, OnInit } from '@angular/core';
import { OrderListService } from 'src/app/service/order-list.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  content: any;
  currentUser: any;
  isLoggedIn = false;
  private roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  addToCarts = false;
  username?: string;
  orderList:any;
  p = 1;
  count = 3;
  searchText:any;
  status!:string;


  constructor(private service: UserServiceService, private orderListService: OrderListService,  private tokenStorageService: TokenStorageService,) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }

    this.status = "pending";

    this.currentUser = this.tokenStorageService.getUser().username;
    console.log(this.currentUser);


    this.orderListService.getOrderByUsername(this.currentUser).subscribe((data) => {
      console.log(data);
      this.orderList = data;
      console.log(this.orderList);
    })

  }


  confirmDelete(orderId:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteOrder(orderId);
        window.location.reload();
      }
    });
  }

  deleteOrder(orderId: string){
    this.service.deleteOrder(orderId).subscribe((data) => {
      console.log("SuccessFully Delete Order");
    })
  }

}

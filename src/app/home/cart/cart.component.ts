import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartService } from 'cartService/cart.service';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { data } from 'jquery';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  closeCart: boolean = false;
  currentUser: any;
  cartList:any = [];
  orderId:any;
  amount:number = 0;
  orderStatus!: boolean;
  private roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  addToCarts = false;
  username?: string;
  item: any = [];
  xyz:any = [];
  isLoggedIn = false;

  CartToUpdate = {
    cartId:"",
    username:"",
    drugsId:"",
    drugsName:"",
    drugsDescription:"",
    drugsCost:"",
    drugsQty:0,
    stockQty: "",
    total:""
  }
  address:any = [];
  cartAmount!: number;
  items = 0;





  constructor(
    private cartService: CartService,
    private tokenStorageService: TokenStorageService, private route:Router
    
    ) { 


    }
  



  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }




    // this.cartList = this.cartService.getLocalStorage();

    // console.log(this.cartList);
    this.currentUser = this.tokenStorageService.getUser().username;
    console.log(this.currentUser);

    this.cartService.getCartDetails(this.currentUser).subscribe((data: any) => {
      console.log(data);
      this.cartList = data;
      console.log(this.cartList);
      this.totalItems(this.cartList);

    });

    this.cartService.getAddressByUsername(this.currentUser).subscribe((add)=>{
      console.log(add);
      this.address = add;
      console.log(this.address);
    });
    
   

    

  }
  genUniqueId(): string {
    const dateStr = Date
      .now()
      .toString(36); // convert num to base 36 and stringify
  
    const randomStr = Math
      .random()
      .toString(36)
      .substring(2, 8); // start at index 2 to skip decimal point
  
    return `${dateStr}-${randomStr}`;
  }


  total(cartList:any){
    for(let i = 0; i < cartList.length; i++){
      this.amount += cartList[i].total;
      console.log(this.amount);
    }
    return this.amount;
  }

  totalItems(item: any){
    for(let i = 0; i < item.length; i++){
      this.items = this.items + item[i].drugsQty;
      console.log(this.items);
    }
  }


  addToOrder(cartList: Cart[]){
    this.orderId = this.genUniqueId();
    console.log(cartList.length);

    
    // this.amount = this.cartList.drugsCost;
    this.cartAmount = this.total(cartList);
    console.log(this.cartAmount);
    this.orderStatus = false;


    this.cartService.pay(this.orderId);


  }

  edit(cart:any){
    this.CartToUpdate = cart;
    console.log(this.CartToUpdate);
  }

  updateCart(updatedForm:NgForm){
    // const drugsId = this.CartToUpdate.drugsId;
    const cartId = this.CartToUpdate.cartId;
    console.log(updatedForm);
    this.cartService.updateCart(updatedForm.value, cartId).subscribe(
      (resp)=> {
        console.log(resp);
        
      },
      (err) =>{
        console.log(err);
      }
    );
    window.location.reload();
  }

  confirmDelete(){
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
        this.deleteItems();
        
      }
    })
  }

  deleteItems(){
    this.cartService.deleteByUsername(this.currentUser).subscribe((data)=>{
      console.log(data);
      this.cartList;
    })
    window.location.reload();
  }


  continue(){
    this.route.navigate(['/order']);
    window.location.reload();
    
  }

  newBilling(){
    this.route.navigateByUrl("/billing");
  }

  refresh(){
    window.location.reload();
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from 'cartService/cart.service';
import { Observable } from 'rxjs';
import { Cart } from '../cart';
import { DrugsService } from '../drugs.service';
import { TokenStorageService } from '../token-storage.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Drugs } from '../drugs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content:any;
  data:any;
  itemList = [];
  isLoggedIn = false;
  private roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  addToCarts = false;
  username?: string;
  item: any = [];
  xyz:any = [];
  currentUser: any;
  searchText:any;
  getValues:any = null;
  abc:any = [];
  result: any = [];
  cartId: any;
  cartLists = [];

  DrugsDescription = {
    "drugsName":"",
    "drugsDescription": "",
    "drugsCost":""
  }


  drugsList:any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private drugsService: DrugsService,
    private cartService: CartService,
    private router: Router
    
    ) { } 

  

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }

    this.currentUser = this.tokenStorageService.getUser().username;
    console.log(this.currentUser);



    

    this.drugsService.getDrugs().subscribe((result)=>{
      console.warn('drugs',result);
      this.content = result;
      // console.log(this.content.drugsName);
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

    addToCart(item: any){
      this.cartId = this.genUniqueId();
      const qty = 1;
  // this.addToCarts = true;
  console.log(item);    
    let user = new Cart(this.cartId, this.currentUser,item.drugsId,item.drugsName,item.drugsCost, qty, item.stockQty,item.drugsDescription,item.total);
    this.cartService.getCartDetails(this.currentUser).subscribe((data: any) => {
    console.log(data);
    this.cartLists = data;
    console.log(this.cartLists.length);
    if(this.cartLists.length<1){
      this.xyz = true;
      console.log(this.xyz)
      this.cartService.postCart(user).subscribe((out)=>{
      // this.message = "The Items have been successfully added to your cart";
      console.log('cart',out);
    });
    Swal.fire("Added Item");
    }else{
      this.xyz = false;
  console.log(this.xyz);
  console.log(this.cartLists.length);

  for(let i in this.cartLists){
    // console.log(typeof(this.cartLists[i].drugsId));
    console.log(user.drugsId);
    console.log(this.cartLists[i]['drugsId']);
    if(user.drugsId !== this.cartLists[i]['drugsId']){
      this.cartService.postCart(user).subscribe((res)=>{
        console.log(res);
      })
    console.log("Added item");
    window.location.reload();
    Swal.fire("Added Item");

    }

    else{
      console.log("The item has already been added");
      window.location.reload();
      Swal.fire("The item has already been added");
    break;
    
    }

  
  }

        
    }

  });

      // this.cartService.setLocalStorage(this.currentUser);
      // console.log(this.cartService);
      

      
    }

    more(item: any){
      console.log(item.drugsId);
      let drugs = new Drugs(item.drugsName,item.drugsDescription, item.drugsCost);
      this.drugsList = drugs;
      console.log(this.drugsList);
      
    }




  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  outsider(){
    Swal.fire({
      title: 'Oops...!',
      text: 'Please Signin For buying the Meds',
      icon: 'error',
      timer: 2000,
  })
  .then(() => {
    {this.router.navigateByUrl('/login');}
  })
    
  }

// console.warn('drugs',item,this.currentUser);



    // this.xyz.push(item);
    // console.log(this.xyz);

    // this.abc = localStorage.getItem('cart-items');

    // this.result  = JSON.parse(this.abc);
     // this.username = this.currentUser.username;
      // console.log(username);
      // console.log(currentUser);

      // this.item.push(this.currentUser);
      // this.cartService.postCart(item).subscribe((out)=>{
      //   console.warn('cart',out);
      //   console.log(item);
      // })


}



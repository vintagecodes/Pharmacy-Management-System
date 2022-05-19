import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'cartService/cart.service';
import { Cart } from 'src/app/cart';
import { DrugsService } from 'src/app/drugs.service';
import { TokenStorageService } from 'src/app/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  content: any;
  isLoggedIn = false;
  roles: any;
  username: any;
  showAdminBoard: any;
  showUserBoard: any;
  addToCarts = false;
  currentUser: any;
  cartId: any;
  cartLists = [];
  message = "";
  xyz = false;
  i= [];

  constructor(private drugsService: DrugsService,
    private tokenStorageService: TokenStorageService, 
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



    this.drugsService.getDrugs().subscribe((result: any)=>{
      console.warn('drugs',result);
      this.content = result;
      // console.log(this.content.drugsName);
    });

    
    // this.drugsService.getDrugsByCategory(categories).
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

    // Swal.fire("The items has been successfully added to cart.");

    const qty = 1;
  // this.addToCarts = true;   
let user = new Cart(this.cartId, this.currentUser,item.drugsId,item.drugsName,item.drugsCost, qty, item.stockQty,item.drugsDescription,item.total);
    console.log(user.drugsId);




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

   

    // for(let i in this.cartLists){
    //   // console.log(typeof(this.cartLists[i].drugsId));
  
    //   if(user.drugsId === i.){
    //     this.message = "The Items are already added to your cart";
        
    //     console.log("Items already Present");
    //     break;
        
    //   }else{
    //     this.cartService.postCart(user).subscribe((res)=>{
    //       this.message = "The Items have been successfully added to your cart";
    //       console.log(res);
    //     })
    //   }
    // }






    

   
  // const drugsCost = 1;
  // let user = new Cart(this.cartId,this.currentUser,item.drugsId,item.drugsName,item.drugsCost, drugsCost,item.drugsDescription, item.total);
  //   console.log(user.drugsId);
  // this.cartService.postCart(user).subscribe((out)=>{
   
  //   console.log('cart',out);
  // })
  // if(this.cartLists.length<1){
  //   this.xyz = true;
  //   console.log(this.xyz)
  //   this.cartService.postCart(user).subscribe((out)=>{
  //     this.message = "The Items have been successfully added to your cart";
  //     console.log('cart',out);
  //   });
  // }else{
  //   this.xyz = false;
  //   console.log(this.xyz);


    // for(let i = 0; i < this.cartLists.length; i++){
    //   // console.log(typeof(this.cartLists[i].drugsId));
  
    //   if(user.drugsId === this.cartLists[i].drugsId){
    //     this.message = "The Items are already added to your cart";
        
    //     console.log("Items already Present");
    //     break;
        
    //   }else{
    //     this.cartService.postCart(user).subscribe((out)=>{
    //       this.message = "The Items have been successfully added to your cart";
    //       this.cartLists.push(out);
    //       console.log(this.cartLists);
    //     })
    //   }
    // }
  

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

  


    // console.log(typeof(user.drugsId));
  
  // for(let i = 0; i < this.cartLists.length; i++){
  //   console.log(typeof(this.cartLists[i].drugsId));

  //   if(user.drugsId === this.cartLists[i].drugsId){
  //     this.message = "The Items are already added to your cart";
      
  //     console.log("Items already Present");
  //     break;
      
  //   }else{
  //     this.cartService.postCart(user).subscribe((out)=>{
  //       this.message = "The Items have been successfully added to your cart";
  //       console.log('cart',out);
  //     })
  //   }
  // }




  

  // this.cartService.setLocalStorage(this.currentUser);
  // console.log(this.cartService);
  

  
}










// function simpleAlert() {
//   throw new Error('Function not implemented.');
// }
 // this.username = this.currentUser.username;
    // console.log(username);
    // console.log(currentUser);

    // this.item.push(this.currentUser);
    // this.cartService.postCart(item).subscribe((out)=>{
    //   console.warn('cart',out);
    //   console.log(item);
    // })
    

  // console.warn('drugs',item,this.currentUser);



  // this.xyz.push(item);
  // console.log(this.xyz);

  // this.abc = localStorage.getItem('cart-items');

  // this.result  = JSON.parse(this.abc);


   // this.cartService.postCart(user).subscribe((out)=>{
    //   // this.message = "The Items have been successfully added to your cart";
    //   console.log('cart',out);
    // });
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'cartService/cart.service';
import { Cart } from 'src/app/models/cart';
import { Drugs } from 'src/app/models/drugs';
import { DrugsService } from 'src/app/service/drugs.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
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
  searchText:any;
  public categories: any;
  abc:any;
  drugsList:any = {};

  constructor(private drugsService: DrugsService,
    private tokenStorageService: TokenStorageService, 
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router) { }

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


    let categories = this.route.snapshot.paramMap.get('categories');
    this.categories = categories;


    this.drugsService.getDrugsByCategory(this.categories).subscribe((cat) => {
      console.log(cat);
      this.content = cat;
    })

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
    this.xyz = false;
  console.log(this.xyz);
  console.log(this.cartLists);
  const found = this.cartLists.some( list => list['drugsId'] === user.drugsId);
  if(!found){
    this.cartService.postCart(user).subscribe((res)=>{
      console.log(res);
    })
  console.log("Added item");
  Swal.fire("Added Item");
  window.location.reload();

  } else {
    console.log("The item has already been added");
    Swal.fire("The item has already been added");
    window.location.reload();
  }


          
      }

    });


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

  // more(item: any){
  //   console.log(item.drugsId);
  //   let drugs = new Drugs(item.drugsName,item.drugsDescription, item.drugsCost, item.supplierName);
  //   this.abc = drugs;
  //   this.drugsList = this.abc;
  //   console.log(this.drugsList.drugsCost);
  //   // this.drugsList.pop();
    
  // }


}

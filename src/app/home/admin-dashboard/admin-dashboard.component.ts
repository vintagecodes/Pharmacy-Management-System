import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DrugSService } from 'src/app/service/drug-s.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { AuthService } from 'src/app/service/auth.service';
import { EChartsOption } from 'echarts';
import { Drugs } from 'src/app/models/drugs';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  title='AdminDashboard';
  public show:boolean = false;
  public shows:boolean = false;
  public buttonName:any = 'Drugs';
  public ButtonName:any = 'Supplier';
  public list:any = 'Supplier-List';
  public Order:any = 'Order';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isLoggedIn = false;
  private roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  p = 1;
  count = 5;

  chart:any = [];

  datas: Product = {
    value: 0,
    name: ''
  };

  DrugsToUpdate = {
    drugsId:"",
    drugsName:"",
    drugsCost:"",
    stockQty:" ",
    drugsDescription:" ",
    supplierName:" ",
  }

  products: Drugs = {
    drugsName: "",
    drugsDescription: "",
    drugsCost: 0,
    stockQty: 0,
    categories: "",
    supplierName: "",
    dateOfExpiration: "",
    productImages: [],
    
  }

  displayStyle = "none";
  content: any;
  currentUser: any;
  userData: any;
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  
 
  DrugsDetails: any;
  constructor(private drugsService: DrugSService,private authService: AuthService, private user: UserServiceService, private token: TokenStorageService, private router: Router, private observer: BreakpointObserver) {
    this.getDrugslist();
   }
  register(registerform:NgForm){
    this.drugsService.registerDrugs(registerform.value).subscribe(
      (resp) => {
        console.log(resp);
        registerform.reset();
        this.getDrugslist();
      },
      (err) => {
        console.log(err)
      }
    );

  }

  getDrugslist(){
    this.drugsService.getDrugslist().subscribe(
      (resp) => {
        console.log(resp);
        this.DrugsDetails=resp;
        console.log(this.DrugsDetails);
        this.getValues(this.DrugsDetails);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getValues(r:any){

    let len = Object.keys(this.DrugsDetails).length;
    console.log(len);
    for(let i=0; i<len; i++){
      let properties = {
        "value":r[i].stockQty,
        "name": r[i].drugsName
      }
      
      this.chart.push(properties);
      
    }
    console.log(this.chart);
    
  }



  deleteDrugs(drug: { drugsId:any}){
    alert("DO you want to delete");
    this.drugsService.deleteDrugs(drug.drugsId).subscribe(
      (resp) => {
        console.log(resp);
        this.getDrugslist();
      },
      (err) => console.log(err)
    );
    window.location.reload();
  }
     
  edit(drug:any){
  this.DrugsToUpdate=drug;
  console.log(this.DrugsToUpdate);
  }
  


  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if(this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }

    this.currentUser = this.token.getUser();
   
    console.log(this.chart)


  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        // this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        // this.sidenav.mode = 'side';
        // this.sidenav.open();
      }
    });
  }

//   showDrugs(){
//     this.show = !this.show;
//     if(this.show){
//       this.buttonName = "Hide Drugs";
//     }
//     else{
//       this.buttonName = "Drugs";
//     }
//   }

//   showSupplier(){
//     this.shows = !this.shows;
//     if(this.shows){
//       this.ButtonName = "Hide Supplier";
//     }
//     else{
//       this.ButtonName = "Supplier";
//     }

// }

// showSupplierList(){
//   this.list = "Supplier List";
//   this.router.navigateByUrl("/supplier-list")
// }

// showOrderDetails(){
//   this.router.navigateByUrl("/order-details")
// }

option: EChartsOption = {
 
  title: {
    text: 'Stocks of Medicines',
    subtext: 'Internal Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: this.chart,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};




}

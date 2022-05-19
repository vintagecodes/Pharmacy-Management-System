import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DrugSService } from 'src/app/drug-s.service';
import { TokenStorageService } from 'src/app/token-storage.service';
import { UserServiceService } from '../../user-service.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

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

  DrugsToUpdate = {
    drugsId:"",
    drugsName:"",
    drugsCost:"",
    stockQty:" ",
    drugsDescription:" ",
    supplierName:" ",
  }

  displayStyle = "none";
  content: any;
  currentUser: any;
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  
 
  DrugsDetails: any ;
  constructor(private drugsService: DrugSService, private user: UserServiceService, private token: TokenStorageService, private router: Router, private observer: BreakpointObserver) {
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
      },
      (err) => {
        console.log(err);
      }
    );
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
    // console.log(this.currentUser);

    // this.user.getAdminDashBoard().subscribe((user) => {
    //   this.content = user;
    // },
    // err=>{
    //   this.content = JSON.stringify(err.message);
    // }
    // )


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


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DrugSService } from 'src/app/service/drug-s.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css']
})
export class DrugsComponent implements OnInit {
  public show:boolean = false;
  public buttonName:any = 'Drugs';
  isLoggedIn = false;
  private roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;

  DrugsToUpdate = {
    drugsId:"",
    drugsName:"",
    drugsCost:"",
    stockQty:" ",
    categories: " ",
    drugsDescription:" ",
    supplierName:" ",
  }

  displayStyle = "none";
  supplierList:any[] = [];
  registerform: any;
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  @ViewChild(NgForm)
  ngForm!: NgForm;

  
 
  DrugsDetails: any ;
  constructor(private drugsService: DrugSService,private tokenStorageService: TokenStorageService) {
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
    Swal.fire('Good Job!','Registration Successful','success');

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

  getSupplierList(){
    this.drugsService.getSupplierlist().subscribe((data) => {
      this.supplierList.push(data);
    })
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
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }
  }

  showDrugs(){
    this.show = !this.show;
    if(this.show){
      this.buttonName = "Hide Drugs";
    }
    else{
      this.buttonName = "Drugs";
    }
  }

}

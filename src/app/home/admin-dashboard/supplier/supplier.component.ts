import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DrugSService } from 'src/app/service/drug-s.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  SupplierDetails:any;
  isRegistrationFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  private roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;

  constructor(private drugsService: DrugSService,private tokenStorageService: TokenStorageService,) { this.getSupplierlist();}
  getSupplierlist() {
    this.drugsService.getSupplierlist().subscribe(
      (data) => {
        console.log(data);
        this.SupplierDetails = data;
    },
    (err) => {
      console.log(err)
    }
    );
  }

  SupplierToUpdate = {
    supplierId:"",
    supplierName:"",
    email:"",
    availableDrugs:" ",
  }

  register(registerform:NgForm){
    this.drugsService.registerSupplier(registerform.value).subscribe(
      resp => {
        this.isRegistrationFailed = false;
        console.log(resp);
        Swal.fire("Good Job!","You clicked the button","success");
        // registerform.reset();
        this.getSupplierlist();
        // Swal.fire("Error","You clicked the button","success");
      },
      err => {
        this.errorMessage = err.error.message;
        this.isRegistrationFailed = true;
        console.log(err.body.message);
        Swal.fire("Error","You clicked the button","error");

      }
      
      
    );
    
  }

  // deleteDrugs(supplier: { supplierId:any}){
  //   alert("DO you want to delete");
  //   this.drugsService.deleteSupplier(supplier.supplierId).subscribe(
  //     (resp) => {
  //       console.log(resp);
  //       this.getSupplierlist();
  //     },
  //     (err) => console.log(err)
  //   );
  //   window.location.reload();
  // }
     
  // edit(supplier:any){
  // this.SupplierToUpdate=supplier;
  // console.log(this.SupplierToUpdate);
  // }

  // updateDrugs(updatedForm:NgForm){
  //   const supplierID = this.SupplierToUpdate.supplierId
  //   this.drugsService.updateSupplier(updatedForm.value, supplierID).subscribe(
  //     (resp)=> {
  //       console.log(resp);
        
  //     },
  //     (err) =>{
  //       console.log(err);
  //     }
  //   );
  // }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }
  }



}

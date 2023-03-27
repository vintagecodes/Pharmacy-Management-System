import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { BillingService } from 'src/app/service/billing.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  checkoutForm!: FormGroup;
  formData: any;
  address: any;
  currentUser: any;
  isLoggedIn = false;
  private roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  add!: Address;
  submitted = false;
  // checkoutForm!: FormGroup;

  // checkoutForm = new FormGroup({
  //   name: new FormControl('name',[Validators.required]),
  //   email: new FormControl("",[Validators.required]),
  //   contactNo: new FormControl("",[Validators.required]),
  //   pincode: new FormControl("",[Validators.required]),
  //   address: new FormControl("",[Validators.required]),
    
  // })

  constructor(private router: Router, private formBuilder: FormBuilder, private service: BillingService, private tokenStorageService: TokenStorageService) {
    
   }

   currentUsers = this.tokenStorageService.getUser().username;
   
  adds:any = {
    username: this.currentUsers,
    name: null,
    email: null,
    pincode: null,
    address: null,
    contactNo: null,

  };

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



  }



  register(){
    this.submitted = true;
    // let add = new Address(this.currentUser, registerform.name, this.formData.email, this.formData.pincode, this.formData.address, this.formData.contactNo);
    this.service.postAddress(this.adds).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err)
      }
    );
    Swal.fire({
      title: 'Good Job!',
      text: 'Successful',
      icon: 'success',
      timer: 2000,
  })
  .then(() => {
      {this.router.navigate(['/order'])}
  })

  }

  // postAdress(formData:any){
    
  // }

  orderSection(){
    this.router.navigateByUrl("/order")
  }

}

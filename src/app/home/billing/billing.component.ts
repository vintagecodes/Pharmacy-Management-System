import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/address';
import { BillingService } from 'src/app/service/billing.service';
import { TokenStorageService } from 'src/app/token-storage.service';
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

  // checkoutForm = new FormGroup({
  //   name: new FormControl('name',[Validators.required]),
  //   email: new FormControl("",[Validators.required]),
  //   contactNo: new FormControl("",[Validators.required]),
  //   pincode: new FormControl("",[Validators.required]),
  //   address: new FormControl("",[Validators.required]),
    
  // })

  constructor(private router: Router, private formBuilder: FormBuilder, private service: BillingService, private tokenStorageService: TokenStorageService) {
    
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

    this.createForm();
    this.currentUser = this.tokenStorageService.getUser().username;
    console.log(this.currentUser);

  }

  

  createForm(){
   this.checkoutForm = this.formBuilder.group({
     name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]+')])],
     email: ['', Validators.compose([Validators.required, Validators.email])],
     pincode: ['',Validators.compose([Validators.required, Validators.pattern('[0-6]+')])],
     address: ['', Validators.compose([Validators.required])],
     contactNo: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+')])]
    
     
   })
  }

  onSubmit(): void {
    this.formData = this.checkoutForm.getRawValue();
    console.log(this.formData);

    let add = new Address(this.currentUser, this.formData.name, this.formData.email, this.formData.pincode, this.formData.address, this.formData.contactNo);
    this.service.postAddress(add).subscribe((data)=>{
      console.log(data);
    });
    Swal.fire('Good','Registration Successful','success');
  }

  // postAdress(formData:any){
    
  // }

  orderSection(){
    this.router.navigateByUrl("/order")
  }

}

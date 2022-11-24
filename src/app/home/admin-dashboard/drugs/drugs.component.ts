import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Drugs } from 'src/app/models/drugs';
import { FileHandle } from 'src/app/models/file-handle';
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
  supplier = "No existing supplier, Please Add a new Supplier";
  

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
  supplierList: any;
  registerform: any;
  image: any;
No: any;
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  @ViewChild(NgForm)
  ngForm!: NgForm;

  
 
  DrugsDetails: any ;
  constructor(private drugsService: DrugSService,private tokenStorageService: TokenStorageService, private sanitizer:DomSanitizer) {
    
   }

   
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }
    this.getDrugslist();
    this.products;
    this.drugsService.getSupplierlist().subscribe((data) => {
      this.supplierList = data
      console.log(this.supplierList);
    })
  }


  onFileSelected(g:any){
    if(g.target.files){
      const file = g.target.files[0];
      console.log(file);

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      console.log(fileHandle);

      this.products.productImages.push(fileHandle);
      console.log(this.products);
    }
  }


  register(registerform:NgForm){
    
    console.log(registerform.value);
    console.log(this.products);
    const productFormData = this.prepareFormData(this.products);
    console.log(productFormData);
    this.drugsService.registerDrugs(productFormData).subscribe(
      (resp) => {
        console.log(resp);
        this.getDrugslist();
        
      
      },
      (err) => {
        console.log(err)
      }
    );
    Swal.fire('Good Job!','Registration Successful','success');
    window.location.reload();

  }

  prepareFormData(product: Drugs):FormData {
    const formData = new FormData();

    formData.append('drugs', new Blob([JSON.stringify(product)], {type: 'application/json'}));

    for(var i = 0;i<product.productImages.length; i++) {
      formData.append('imageFile',product.productImages[i].file,
      product.productImages[i].file.name);
    }
    console.log(formData);

    return formData;
  }

  getDrugslist(){
    this.drugsService.getDrugslist().subscribe(
      (resp) => {
        console.log(resp);
        this.DrugsDetails=resp;
        // this.gettingImages(this.DrugsDetails);
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
  



  showDrugs(){
    this.show = !this.show;
    if(this.show){
      this.buttonName = "Hide Drugs";
    }
    else{
      this.buttonName = "Drugs";
    }
  }



  // gettingImages(si:any){
  //   for(let i = 0; i < si.length; i++){
  //     for(let j = 0; j < si[i].productImg.length; j++){
  //       let objectURL = 'data:image/png;base64,' + si[i].productImg[j].picByte;
  //       this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        
  //       // console.log(si[i].productImg[j].picByte);
  //     }
  //     // console.log(si[i].productImages[i]);
  //   }
  // }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Drugs } from 'src/app/models/drugs';
import { FileHandle } from 'src/app/models/file-handle';
import { DrugSService } from 'src/app/service/drug-s.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drugs-list',
  templateUrl: './drugs-list.component.html',
  styleUrls: ['./drugs-list.component.scss']
})
export class DrugsListComponent implements OnInit {

  p = 1;
  count = 5;
  isLoggedIn = false;
  private roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;


  DrugsToUpdate = {
    drugsId:"",
    drugsName:"",
    drugsCost:"",
    stockQty:" ",
    drugsDescription:" ",
    supplierName:" ",
    productImages: []
   
  }

  DrugsDetails: any ;

  constructor(private drugsService: DrugSService, private tokenStorageService: TokenStorageService,private sanitizer:DomSanitizer) {  this.getDrugslist();}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }

    this.DrugsToUpdate;
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

  confirmDelete(drug:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteDrugs(drug);
        
      }
    })
  }

  deleteDrugs(drug:any){
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
  
  updateDrugs(updatedForm:NgForm){
    const drugsID = this.DrugsToUpdate.drugsId;
    this.drugsService.updateDrugs(this.DrugsToUpdate, drugsID).subscribe(
      (resp)=> {
        console.log(resp);
        
      },
      (err) =>{
        console.log(err);
      }
    );

    window.location.reload();
  }

  // onFileSelected(g:any){
  //   if(g.target.files){
  //     const file = g.target.files[0];
  //     console.log(file);

  //     const fileHandle: FileHandle = {
  //       file: file,
  //       url: this.sanitizer.bypassSecurityTrustUrl(
  //         window.URL.createObjectURL(file)
  //       )
  //     }

  //     console.log(fileHandle);

  //     this.DrugsToUpdate.productImages.push(fileHandle);
  //     console.log(this.products);
  //   }
  // }

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


}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DrugSService } from 'src/app/drug-s.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
  SupplierDetails:any;

  SupplierToUpdate = {
    supplierId:"",
    supplierName:"",
    email:"",
    availableDrugs:" ",
  }
  supplierId: any;

  constructor(private drugsService: DrugSService) {
    
   }
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

  ngOnInit(): void {
    this.getSupplierlist();
  }


  confirmDelete(supplier:any){
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
        this.deleteDrugs(supplier);
        
      }
    })
  }

  deleteDrugs(supplier:any){
    this.supplierId = this.SupplierDetails.supplierId;
    this.drugsService.deleteSupplier(supplier.supplierId).subscribe(
      (resp) => {
        console.log(resp);
        this.getSupplierlist();
      },
      (err) => console.log(err)
    );
    window.location.reload();
  }
     
  edit(supplier:any){
  this.SupplierToUpdate=supplier;
  console.log(this.SupplierToUpdate);
  }

  updateDrugs(updatedForm:NgForm){
    const supplierID = this.SupplierToUpdate.supplierId
    this.drugsService.updateSupplier(updatedForm.value, supplierID).subscribe(
      (resp)=> {
        console.log(resp);
        
      },
      (err) =>{
        console.log(err);
      }
    );
  }

}

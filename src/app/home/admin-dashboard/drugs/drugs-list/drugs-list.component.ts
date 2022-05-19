import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DrugSService } from 'src/app/drug-s.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drugs-list',
  templateUrl: './drugs-list.component.html',
  styleUrls: ['./drugs-list.component.scss']
})
export class DrugsListComponent implements OnInit {

  DrugsToUpdate = {
    drugsId:"",
    drugsName:"",
    drugsCost:"",
    stockQty:" ",
    drugsDescription:" ",
    supplierName:" ",
  }

  DrugsDetails: any ;

  constructor(private drugsService: DrugSService) {  this.getDrugslist();}

  ngOnInit(): void {
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
    this.drugsService.updateDrugs(updatedForm.value, drugsID).subscribe(
      (resp)=> {
        console.log(resp);
        
      },
      (err) =>{
        console.log(err);
      }
    );
  }


}

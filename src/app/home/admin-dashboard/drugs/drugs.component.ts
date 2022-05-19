import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DrugSService } from 'src/app/drug-s.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css']
})
export class DrugsComponent implements OnInit {
  public show:boolean = false;
  public buttonName:any = 'Drugs';

  DrugsToUpdate = {
    drugsId:"",
    drugsName:"",
    drugsCost:"",
    stockQty:" ",
    drugsDescription:" ",
    supplierName:" ",
  }

  displayStyle = "none";
  supplierList:any[] = [];
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  
 
  DrugsDetails: any ;
  constructor(private drugsService: DrugSService) {
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

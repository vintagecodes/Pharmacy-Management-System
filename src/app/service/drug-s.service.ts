import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrugSService {
  basePath: any;

  constructor(private http: HttpClient) { }
  API = "http://localhost:7000";
  SUPPLIER_API = "http://localhost:7000";
 

  public registerDrugs(DrugsDetails: FormData ) {
    return this.http.post(this.API + '/drugs/',DrugsDetails);
  }

  public getDrugslist() {
    return this.http.get(this.API + '/drugs/list');
  }
  public deleteDrugs(id: string){
    return this.http.delete(this.API  + '/drugs/' +id);
  }

  public updateDrugs(drugs:any, id: string){
    return this.http.put(this.API  + '/drugs/' +id, drugs);
  }

  public registerSupplier(SupplierDetails:any){
    return this.http.post(this.SUPPLIER_API + '/supplier/',SupplierDetails);
  }
  public getSupplierlist() {
    return this.http.get(this.SUPPLIER_API + '/supplier/list');
  }
  public deleteSupplier(id: string){
    return this.http.delete(this.SUPPLIER_API + '/supplier/' +id);
  }

  public updateSupplier(supplier:any, id:string){
    return this.http.put(this.SUPPLIER_API  + '/supplier/' +id, supplier);
  }
}

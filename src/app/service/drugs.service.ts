import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrugsService {
  drugs_url = "http://localhost:7000/drugs/list"

  URL_BY_ID = "http://localhost:7000/drugs/"

  URL_BY_CATEGORY = "http://localhost:7000/drugs/category/"

  GET_IMAGE = "http://localhost:7000/drugs/getPhotos/"

  constructor(private http: HttpClient) { }

  getDrugs(){
    return this.http.get(this.drugs_url);
  }

  findByProductId(drugsId:any){
    return this.http.get(this.URL_BY_ID+drugsId);
  }

  getDrugsByCategory(categories:any){
    return this.http.get(this.URL_BY_CATEGORY+categories);
  }

  getPhotos(){
    return this.http.get(this.GET_IMAGE);
  }
}

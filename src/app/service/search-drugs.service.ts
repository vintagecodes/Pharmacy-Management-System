import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchDrugsService {

  SEARCH_DRUGS_API_URL = 'http://localhost:7000/drugs/drugs-name/';

  constructor(private http: HttpClient) { }

  searchDrugs(name: any){
    return this.http.get(this.SEARCH_DRUGS_API_URL+name);
  }
}

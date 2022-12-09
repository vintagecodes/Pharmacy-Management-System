import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

const API = 'http://localhost:7000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(API + 'signin',{
      username,
      password
    }, httpOptions);
  }

  register(username: string, email:string, password: string): Observable<any> {
    return this.http.post(API + 'signup',{
      username,
      email,
      password
    }, httpOptions);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(API + 'users');
  }

  getDeleteUsers(username:string){
    return this.http.delete(API + 'delete/'+ username);
  }

}

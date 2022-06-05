import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/service/token-storage.service';
const TOKEN_HEADER_KEY = 'Authorization'; 


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private token: TokenStorageService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       let authRequest = req;
       const currentUser = this.token.getUser().username;
       console.log(currentUser.token);
       const token = this.token.getToken();
       if(currentUser && currentUser.token) {
           authRequest = req.clone({
               headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer'+token)
           });
       }
       return next.handle(authRequest);
       
    }
    
}

export const authInterceptorProvider = [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
}
];
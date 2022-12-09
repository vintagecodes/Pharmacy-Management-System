import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  currentUser: any;

  constructor(private route:Router,private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      const user = this.tokenStorage.getUser();
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        Swal.fire({
          title: 'Login Success',
          text: 'Redirecting...',
          icon: 'success',
          timer: 2000,
      })
      .then(() => {
          {this.route.navigate(['/home'])}
          window.location.reload();
      })
      },
      err => {
        this.isLoginFailed = true;
        Swal.fire({
          title: 'OOpss...',
          text: 'Login Failed',
          icon: 'error',
          timer: 2000,
      })
      }
    );

  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}

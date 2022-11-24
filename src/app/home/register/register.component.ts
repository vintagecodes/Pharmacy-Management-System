import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  currentUser: any;


  constructor(private auth: AuthService, private router: Router,private route:Router,private authService: AuthService, private tokenStorage: TokenStorageService) { }

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
    Swal.fire({
      title: 'Uploading...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    const { username, email, password } = this.form;
    this.auth.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        Swal.fire('Good Job!','SuccessFully Registered, Taking you to the Login Page','success');
        {this.router.navigateByUrl('/login');}
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        Swal.fire('Oops! Something went wrong','error');
      }
    );
    
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}

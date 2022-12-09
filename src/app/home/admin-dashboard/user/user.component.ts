import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isLoggedIn = false;
  private roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  currentUser: any;
  userData: any;
  p = 1;
  count = 5;
  searchText:any;

  constructor(private authService: AuthService, private user: UserServiceService, private token: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if(this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }

    this.getUsers();

    this.currentUser = this.token.getUser();

  }

  getUsers(){
    this.authService.getAllUsers().subscribe(
      (data) => {
        console.log(data);
        this.userData = data;
      }
    )
  }


  confirmDelete(user:any){
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
        this.deleteUser(user);
        window.location.reload();
        
      }
    })
  }

  deleteUser(user: any) {
    this.authService.getDeleteUsers(user.username).subscribe((result) => {
      console.log(result);
    })
  }

}

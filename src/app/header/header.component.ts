import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'cartService/cart.service';
import { DrugsService } from '../service/drugs.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  private roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  currentUser: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private drugsService: DrugsService,
    private cartService: CartService,
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }

    this.currentUser = this.tokenStorageService.getUser().username;
    console.log(this.currentUser);
  }


  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}

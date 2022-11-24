import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;
  public roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  sidenav1!: MatSidenav;
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }
  }

  
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}

import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TokenStorageService } from 'src/app/service/token-storage.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLoggedIn = false;
  currentUser: any;
  public roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  xyz:any = [];
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

 
  constructor( private cd: ChangeDetectorRef,  private tokenStorageService: TokenStorageService, private observer: BreakpointObserver) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(this.roles[0]);
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }
    this.currentUser = this.tokenStorageService.getUser().username;
  }

  addToCart(item: any){
    console.warn('drugs',item);



    this.xyz.push(item);
    console.log(this.xyz);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    this.cd.detectChanges();
  }

  

  

}

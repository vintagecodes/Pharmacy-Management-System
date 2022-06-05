import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { DrugsService } from '../service/drugs.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  sidenav1!: MatSidenav;
  isLoggedIn = false;
  private roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  res: any;
  item:any;
  arr1:any;

  constructor(
    private cd: ChangeDetectorRef,
    private observer: BreakpointObserver,private tokenStorageService: TokenStorageService, private router: Router, private drugsService: DrugsService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }

    
    this.drugsService.getDrugs().subscribe((result)=>{
      console.log(result);
      this.res = result;
      console.log(this.res);

      this.arr1 = this.getUniqueListBy(this.res,'categories');
      console.log(this.arr1);


    });

  }

  getUniqueListBy(arr:any, key:any) {
    return [...new Map(arr.map((item:any) => [item[key], item])).values()]
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
        this.sidenav1.mode = 'over';
        this.sidenav1.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
        this.sidenav1.mode = 'side';
        this.sidenav1.open();
      }
    });

    this.cd.detectChanges();
  }

  shop(){
    this.router.navigateByUrl('/shop');
  }

  cat(a:any){
    this.router.navigate(['/category',a.categories]);
    console.log(a.categories);

  }



}

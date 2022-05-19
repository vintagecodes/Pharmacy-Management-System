import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './home/profile/profile.component';
import { AdminDashboardComponent } from './home/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './home/user-dashboard/user-dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { CartService } from 'cartService/cart.service';
import { CartComponent } from './home/cart/cart.component';
import { NavComponent } from './home/nav/nav.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './pharmacy/category/category.component';
import { ShopComponent } from './pharmacy/shop/shop.component';
import { DrugsComponent } from './home/admin-dashboard/drugs/drugs.component';
import { SupplierComponent } from './home/admin-dashboard/supplier/supplier.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { NextDirective } from './next.directive';
import { PrevDirective } from './prev.directive';
import {MatCardModule} from '@angular/material/card';
import { BillingComponent } from './home/billing/billing.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { OrderComponent } from './home/order/order.component';
import { SupplierListComponent } from './home/admin-dashboard/supplier-list/supplier-list.component';
import { ImageSliderComponent } from './pharmacy/shop/image-slider/image-slider.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrderDetailsComponent } from './home/admin-dashboard/order-details/order-details.component';
import { DrugsPerOrderComponent } from './home/admin-dashboard/order-details/drugs-per-order/drugs-per-order.component';
import { DrugsListComponent } from './home/admin-dashboard/drugs/drugs-list/drugs-list.component';
import {MatExpansionModule} from '@angular/material/expansion';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    AddtocartComponent,
    CartComponent,
    NavComponent,
    PharmacyComponent,
    NavBarComponent,
    FooterComponent,
    CategoryComponent,
    ShopComponent,
    DrugsComponent,
    SupplierComponent,
    NextDirective,
    PrevDirective,
    BillingComponent,
    OrderComponent,
    SupplierListComponent,
    ImageSliderComponent,
    OrderDetailsComponent,
    DrugsPerOrderComponent,
    DrugsListComponent,
    
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatExpansionModule,
  ],
  exports:[
    CartComponent
  ],
  providers: [
    CartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

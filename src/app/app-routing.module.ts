import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { AdminDashboardComponent } from './home/admin-dashboard/admin-dashboard.component';
import { CartComponent } from './home/cart/cart.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './home/nav/nav.component';
import { LoginComponent } from './home/login/login.component';
import { ProfileComponent } from './home/profile/profile.component';
import { RegisterComponent } from './home/register/register.component';
import { UserDashboardComponent } from './home/user-dashboard/user-dashboard.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { ShopComponent } from './pharmacy/shop/shop.component';
import { BillingComponent } from './home/billing/billing.component';
import { OrderComponent } from './home/order/order.component';
import { SupplierListComponent } from './home/admin-dashboard/supplier-list/supplier-list.component';
import { OrderDetailsComponent } from './home/admin-dashboard/order-details/order-details.component';
import { DrugsPerOrderComponent } from './home/admin-dashboard/order-details/drugs-per-order/drugs-per-order.component';
import { SupplierComponent } from './home/admin-dashboard/supplier/supplier.component';
import { DrugsComponent } from './home/admin-dashboard/drugs/drugs.component';
import { DrugsListComponent } from './home/admin-dashboard/drugs/drugs-list/drugs-list.component';
import { CategoryComponent } from './pharmacy/shop/category/category.component';
import { UserComponent } from './home/admin-dashboard/user/user.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'nav', component: NavComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'myorders', component: UserDashboardComponent },
  { path: 'api/user-auth/admin', component: AdminDashboardComponent },
  { path: 'addtocart', component: AddtocartComponent },
  { path: 'cart', component: CartComponent },
  {path: 'hi', component: PharmacyComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'billing', component: BillingComponent},
  {path: 'order', component: OrderComponent},
  {path: 'supplier', component: SupplierComponent},
  {path: 'supplier-list', component: SupplierListComponent},
  {path: 'drugs', component: DrugsComponent},
  {path: 'users', component: UserComponent},
  {path: 'drugs/drugs-list', component: DrugsListComponent},
  {path: 'order-details', component: OrderDetailsComponent},
  {path: 'order-details/:orderId', component: DrugsPerOrderComponent},
  {path: 'category/:categories', component: CategoryComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

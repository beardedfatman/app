import { PaymentService } from './payment.service';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { OrderService } from './order.service';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductService } from './product.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { CanActivate, RouterModule } from '@angular/router';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { StoryComponent } from './story/story.component';
import { HowToComponent } from './how-to/how-to.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { CommonModule } from '@angular/common';

export const firebaseConfig = environment.firebaseConfig;

import { AngularFireModule } from 'angularfire2';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    LoginComponent,
    ProfileComponent,
    ManageOrdersComponent,
    StoryComponent,
    HowToComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'shop', component: ProductsComponent },
      { path: 'basket', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
      { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },
      { path: 'login', component: LoginComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
      { path: 'about', component: StoryComponent },
      { path: 'how-to', component: HowToComponent },
      // admin
      { path: 'manage-orders', component: ManageOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path: 'new-product', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuardService, AdminAuthGuardService] }
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    ProductService,
    ShoppingCartService,
    OrderService,
    PaymentService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

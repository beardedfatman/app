import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<{}>;

  constructor(private auth: AuthService, private cartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.cartService.getCart();

  }

  logout() {
    this.auth.logout();
  }

  gLogin() {
    this.auth.gLogin();
  }

}

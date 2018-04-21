import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Order } from './models/order';

@Injectable()
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) { }

  async placeOrderD(order) {
    let result = await this.db.list('/orders/delivery').push(order);
    this.cartService.clearCart();
    return result;
  }
  async placeOrderP(order) {
    let result = await this.db.list('/orders/pick-up').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrdersP() {
    return this.db.list('/orders/pick-up');
  }

  getOrdersD() {
    return this.db.list('/orders/delivery');
  }

  getOrdersByUserP(userId: string) {
    return this.db.list('/orders/pick-up', ref => ref.orderByChild('userId').equalTo(userId));
  }

  getOrdersByUserD(userId: string) {
    return this.db.list('/orders/delivery', ref => ref.orderByChild('userId').equalTo(userId));
  }
}

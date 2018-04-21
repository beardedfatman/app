import { ShoppingCart } from './../models/shopping-cart';
import { OrderService } from './../order.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Order } from './../models/order';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit , OnDestroy, ElementRef, Input, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { environment } from './../../environments/environment';
import { PaymentService } from './../payment.service';
import { Shipping } from '../models/shipping';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  @ViewChild('cardInfo') cardInfo: ElementRef;
  // @Input() amount: number;

  handler: any;
  amount;
  shipping: Object = {};
  method;
  userId: string;
  userSubscription: Subscription;
  error: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private cartService: ShoppingCartService
  ) {}


  ngOnInit() {
    this.amount = this.cart.totalPrice * 100;
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      locale: 'auto',
      token: token => {
        this.paymentService.processPayment(token, this.amount);
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    if (this.method === 'delivery') {
      const order = new Order(this.userId, this.shipping, this.cart);
      const res1 = await this.orderService.placeOrderD(order);
      this.router.navigate(['/order-success', res1.key]);
    } else {
      const order = new Order(this.userId, this.shipping, this.cart);
      const res2 = await this.orderService.placeOrderP(order);
      this.router.navigate(['/order-success', res2.key]);
    }
  }

  deliver() {
    this.method = 'delivery';
  }

  pickup() {
    this.method = 'pickup';
  }

  async handlePayment() {
    this.handler.open({
      name: 'Anne\'s Bakery',
      amount: this.amount,
      currency: 'sgd'
    });
    if (this.method === 'delivery') {
      const order = new Order(this.userId, this.shipping, this.cart);
      const res1 = await this.orderService.placeOrderD(order);
    } else {
      const order = new Order(this.userId, this.shipping, this.cart);
      const res2 = await this.orderService.placeOrderP(order);
    }
  }

  @HostListener('window:popstate')
    onPopstate() {
      this.handler.close();
    }
}

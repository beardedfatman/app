import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  ordersP$;
  ordersD$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
      this.ordersP$ = authService.user$.switchMap(u => orderService.getOrdersByUserP(u.uid));
      this.ordersD$ = authService.user$.switchMap(u => orderService.getOrdersByUserD(u.uid));
  }
}

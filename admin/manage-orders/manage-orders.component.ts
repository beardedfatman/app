import { OrderService } from './../../order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent {
  ordersP$;
  ordersD$;

  constructor(private orderService: OrderService) {
    this.ordersP$ = orderService.getOrdersP();
    this.ordersD$ = orderService.getOrdersD();
   }

}

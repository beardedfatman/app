import { ProductService } from './../product.service';
import { Product } from './../models/product';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  prodToChk;

  constructor(private cartService: ShoppingCartService, private productService: ProductService) { }

  plusOne(product: Product) {
    this.cartService.updateItem(product, 1);
  }

  removeOne(product: Product) {
    this.cartService.updateItem(product, -1);
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  clearCart(){
    this.cartService.clearCart();
  }
}

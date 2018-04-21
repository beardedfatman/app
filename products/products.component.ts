import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ProductService } from './../product.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  proudcts$: AngularFireList<{}>;
  cart: any;
  subscription;
  closeResult: string;

  constructor(private cartService: ShoppingCartService, private productService: ProductService, private modalService: NgbModal) {
    this.proudcts$ = this.productService.getAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngOnInit() {
    this.subscription = this.cartService.getCart();
    // \(cart => this.cart = cart);
  }

  addToCart(product: Product) {
    this.cartService.updateItem(product, 1);
  }

  // removeFromCart() {
  //   this.cartService.removeFromCart(product);
  // }

  getQuantity(p) {
    // tslint:disable-next-line:curly
    if (!this.cart) return 0;
    const items = this.cart.items;
    console.log(items[p]);
    return items[p].quantity ? items[p].quantity : 0;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

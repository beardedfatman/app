import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {
  product: Observable<any>;

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getOne(productId) {
    this.product = this.db.object('/products/' + productId).valueChanges();
    return this.product;
  }

  getAll() {
    return this.db.list('products');
  }

}

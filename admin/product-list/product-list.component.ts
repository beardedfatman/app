import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();
  }

  ngOnInit() {
  }

}

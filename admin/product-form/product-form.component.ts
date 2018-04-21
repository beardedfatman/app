import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(private productService: ProductService) { }

  save(product) {
    this.productService.create(product);
  }

  ngOnInit() {
  }

}

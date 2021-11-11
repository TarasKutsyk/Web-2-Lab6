import {Component, Input, OnInit} from '@angular/core';
import Product from "../../../models/Product";
import {ProductService} from "../../../services/product.service";
import {Action} from "../../../models/Action";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product !: Product;
  constructor(private productService: ProductService) { }

  updateProduct() {
    this.productService.setAction({action: Action.Update, payload: this.product});
  }

  deleteProduct() {
    this.productService.setAction({action: Action.Delete, payload: this.product});
  }

  addProductToCart() {
    this.productService.setAction({action: Action.AddToCart, payload: this.product});
  }

  ngOnInit(): void {
  }
}

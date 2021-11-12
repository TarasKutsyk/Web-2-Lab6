import { Component, OnInit } from '@angular/core';

import {ProductAction, ProductService} from "../../services/product.service";
import Product from "../../models/Product";
import {HttpErrorResponse} from "@angular/common/http";
import {Action} from "../../models/Action";


@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {
  products: Product[] = []
  errorText?: string

  constructor(private productService: ProductService) {
    productService.getProducts().subscribe(items => this.products = items);

    productService.currentProductAction.subscribe((pa: ProductAction) => {
      const { payload } = pa;

      if (pa.action === Action.Delete) {
        this.deleteProduct(payload);
      } else if (pa.action === Action.Create) {
        this.addProduct(payload);
      } else if (pa.action === Action.UpdateReady) {
        this.editProduct(payload);
      }
    });
  }

  ngOnInit(): void {
  }

  deleteProduct(currentProduct: Product) {
    this.productService.deleteProduct(currentProduct).subscribe(
      () => {
        const productIndex = this.products.findIndex(product => product._id === currentProduct._id);

        this.products.splice(productIndex, 1);
      },
      this.handleError('Product delete error')
    );
  }

  editProduct(newProduct: Product) {
    this.productService.updateProduct(newProduct)
      .subscribe(() => {
        const newProductIndex = this.products.findIndex(product => product._id === newProduct._id);

        this.products[newProductIndex] = newProduct;
      },
        this.handleError('Product update error')
      );
  }

  addProduct(product: Product) {
    this.productService.createProduct(product)
      .subscribe((newProduct: Product) => {
        this.products.push(newProduct);
      },
        this.handleError('Product create error')
    );
  }

  handleError(description: string) {
    return (error: HttpErrorResponse) => {
      this.errorText = error.status === 0 ?
        `A client error occurred: ${error.error}` :
        `${description}: ${error.error}`
    }
  }
}

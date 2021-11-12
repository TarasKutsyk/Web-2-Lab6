import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

import {ApiConfig} from "../config"
import Product, {ProductCart} from "../models/Product";
import {Subject} from "rxjs";
import {Action, ActionType} from "../models/Action";

export type ProductAction = {
  payload: Product,
  action: ActionType
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productSubject = new Subject<ProductAction>();

  currentProductAction = this.productSubject.asObservable();
  productsUrl: string = ApiConfig.products;

  constructor(private API: ApiService<Product>) {

  }

  setAction(action: ProductAction) {
    this.productSubject.next(action);
  }

  getProducts() {
    return this.API.getItems(this.productsUrl);
  }

  createProduct(product: Product) {
    return this.API.addItem(product, this.productsUrl);
  }

  postOrder(cartItems: Array<{productId ?: string, count: number}>) {
    // @ts-ignore
    return this.API.addItem({cartItems}, this.productsUrl + '/order');
  }

  updateProduct(product: Product) {
    return this.API.editItem(product, this.productsUrl);
  }

  deleteProduct(product: Product) {
    return this.API.deleteItem(product, this.productsUrl);
  }
}

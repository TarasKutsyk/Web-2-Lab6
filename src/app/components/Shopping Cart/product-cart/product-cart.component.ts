import { Component, OnInit } from '@angular/core';
import { Action } from 'src/app/models/Action';
import Product, {ProductCart, ProductCartItem} from "../../../models/Product";
import {ProductService, ProductAction} from "../../../services/product.service";

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})

export class ProductCartComponent implements OnInit {
  cart: ProductCart = [];

  constructor(private productService: ProductService) {
    productService.currentProductAction.subscribe((productAction: ProductAction) => {
      if (productAction.action === Action.AddToCart) {
        this.handleNewItem(productAction.payload);
      } else if (productAction.action === Action.Delete) {
        this.removeItemFromCart(productAction.payload);
      } else if (productAction.action === Action.UpdateReady) {
        this.updateItem(productAction.payload);
      }
    });
  }

  handleNewItem (product: Product) {
    if (this.cart.find(el => el.item === product)) {
      return;
    }

    const newItem: ProductCartItem = {
      item: product,
      count: 1
    }
    this.cart.push(newItem);
  }

  removeItemFromCart(product: Product) {
    const indexToDelete = this.cart.findIndex(el => el.item === product);
    this.cart.splice(indexToDelete, 1);
  }

  updateItem(product: Product) {
    const indexToUpdate = this.cart.findIndex(el => el.item._id === product._id);
    this.cart[indexToUpdate].item = product;
  }

  removeItemById({id}: {id?: string}) {
    const indexToDelete = this.cart.findIndex(el => el.item._id === id);
    this.cart.splice(indexToDelete, 1);
  }

  changeItemCount({id, countChange}: {id?: string, countChange: number}) {
    const indexToUpdate = this.cart.findIndex(el => el.item._id === id);
    const currentItemCount = this.cart[indexToUpdate].count;
    const newItemCount = currentItemCount + countChange

    if (newItemCount > 0) {
      this.cart[indexToUpdate].count = newItemCount;
    }
  }

  ngOnInit(): void {
  }
}

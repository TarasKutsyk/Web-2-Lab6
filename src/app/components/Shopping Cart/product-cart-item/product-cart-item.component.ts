import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {ProductCartItem} from "../../../models/Product";

@Component({
  selector: 'app-product-cart-item',
  templateUrl: './product-cart-item.component.html',
  styleUrls: ['./product-cart-item.component.scss']
})
export class ProductCartItemComponent implements OnInit {
  @Input()
  cartItem!: ProductCartItem
  @Output()
  changeCountEvent = new EventEmitter<{id?: string, countChange: number}>();
  @Output()
  removeEvent = new EventEmitter<{id?: string}>();

  isActive = false;

  constructor() { }

  setActive(isActive: boolean) {
    this.isActive = isActive;
  }

  changeCount(change: number) {
    this.changeCountEvent.emit({id: this.cartItem.item._id, countChange: change})
  }

  removeItem() {
    this.removeEvent.emit({id: this.cartItem.item._id})
  }

  ngOnInit(): void {
  }
}

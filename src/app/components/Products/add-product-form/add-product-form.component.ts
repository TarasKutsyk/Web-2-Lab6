import {Component, Input, OnInit, EventEmitter} from '@angular/core';
import Product from "../../../models/Product";
import {NgForm} from "@angular/forms";
import {ProductAction, ProductService} from "../../../services/product.service";
import {Action} from "../../../models/Action";

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent implements OnInit {
  editFlag = false;
  updateObject?: Product;
  //NOTE: only falsy values
  productFormModel: Product = {
    name: '',
    price: 0
  }

  constructor(private productService: ProductService) {
    productService.currentProductAction.subscribe((pa: ProductAction) => {
      if (pa.action === Action.Update) {
        const { payload } = pa;

        this.editFlag = true;
        this.updateObject = payload;

        this.prepareEditForm(payload);
      }
    });
  }

  ngOnInit(): void {
  }

  prepareEditForm(product: Product) {
    this.productFormModel = {...product, _id: undefined};
  }

  submitProduct(form: NgForm) {
    const newData = this.productFormModel;

    if (this.editFlag) {
      const updatedProduct = this.mergeUpdatedProduct(this.updateObject as Product, newData);

      this.productService.setAction({action: Action.UpdateReady, payload: updatedProduct});
      this.editFlag = false;
    } else {
      this.productService.setAction({action: Action.Create, payload: newData})
    }

    form.resetForm();
  }

  mergeUpdatedProduct(oldProduct : Product, newProduct: Product) {
    const mergedProduct = {...oldProduct};

    for (const newProductKey in newProduct) {
      // @ts-ignore
      if (newProduct[newProductKey]) {
        // @ts-ignore
        mergedProduct[newProductKey] = newProduct[newProductKey];
      }
    }

    return mergedProduct;
  }
}

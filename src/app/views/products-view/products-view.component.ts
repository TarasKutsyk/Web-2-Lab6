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
  planets: Product[] = []
  errorText?: string

  constructor(private planetService: ProductService) {
    planetService.getProducts().subscribe(items => this.planets = items);

    planetService.currentProductAction.subscribe((pa: ProductAction) => {
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
    this.planetService.deleteProduct(currentProduct).subscribe(
      () => {
        const planetIndex = this.planets.findIndex(planet => planet._id === currentProduct._id);

        this.planets.splice(planetIndex, 1);
      },
      this.handleError('Product delete error')
    );
  }

  editProduct(newProduct: Product) {
    this.planetService.updateProduct(newProduct)
      .subscribe(() => {
        const newProductIndex = this.planets.findIndex(planet => planet._id === newProduct._id);

        this.planets[newProductIndex] = newProduct;
      },
        this.handleError('Product update error')
      );
  }

  addProduct(planet: Product) {
    this.planetService.createProduct(planet)
      .subscribe((newProduct: Product) => {
        this.planets.push(newProduct);
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

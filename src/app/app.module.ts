import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsViewComponent } from './views/products-view/products-view.component';
import { ApiService } from "./services/api.service";
import { ProductsComponent } from './components/Products/products/products.component';
import { ProductComponent } from './components/Products/product/product.component';
import { FormsModule } from "@angular/forms";
import { AddProductFormComponent } from './components/Products/add-product-form/add-product-form.component';
import { ErrorFormComponent } from './components/error-form/error-form.component';
import { ProductCartComponent } from './components/Shopping Cart/product-cart/product-cart.component';
import { ProductCartItemComponent } from './components/Shopping Cart/product-cart-item/product-cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProductsViewComponent,
    ProductsComponent,
    ProductComponent,
    AddProductFormComponent,
    ErrorFormComponent,
    ProductCartComponent,
    ProductCartItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

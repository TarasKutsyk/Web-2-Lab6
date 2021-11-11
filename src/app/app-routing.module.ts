import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductsViewComponent} from "./views/products-view/products-view.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductsViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

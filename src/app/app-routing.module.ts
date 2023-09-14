import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./components/products/products.component').then(c => c.ProductsComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./components/product-details/product-details.component').then(c => c.ProductDetailsComponent)
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: '**', 
    pathMatch: 'full',
    redirectTo: '/products?category=women_main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

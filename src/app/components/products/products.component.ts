import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { SingleProductComponent } from '../single-product/single-product.component';
import { IProduct } from 'src/app/interface/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, SingleProductComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  loading: boolean = false;
  subscriptions$ = new Subscription();

  constructor(
    private readonly productService: ProductsService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(
        {
          next: (res) => {
            this.getProductsInCategory(res['category'])
          }
        }
      )
  }

  getProductsInCategory(category: string) {
    this.loading = true;
    this.subscriptions$.add(
      this.productService.getProductsInCategory(category)
        .subscribe(
          {
            next: (res) => {
              this.loading = false;
              this.products = res;

            },
            error: (err) => {
              this.loading = false;
            }
          }
        )
    )

  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe()
  }

}

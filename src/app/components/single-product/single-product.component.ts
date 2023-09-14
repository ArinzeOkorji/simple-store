import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from 'src/app/interface/product';
import { UtilityService } from 'src/app/services/utility.service';
import { ProductsService } from 'src/app/services/products.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent {
  @Input()
  product!: IProduct;

  constructor(
    private readonly utilityService: UtilityService,
    private readonly productService: ProductsService
  ) {}

  get currency() {
    return this.utilityService.selectedCurrency.split(' ')[1];
  }

  selectProduct(product: IProduct) {
    this.productService.addToCart(product);
  }

}

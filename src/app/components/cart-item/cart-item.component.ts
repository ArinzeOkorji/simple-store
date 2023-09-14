import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct, IProductVariants } from 'src/app/interface/product';
import { ProductsService } from 'src/app/services/products.service';
import { UtilityService } from 'src/app/services/utility.service';

declare var $:any;

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input()
  product!: IProduct;

  @Input()
  fullPage = true;

  @Output()
  calulateTotal = new EventEmitter<any>()

  quantity = 1;

  selectedVariant!: IProductVariants;
  selectedSize!: string;

  constructor(
    private readonly utilityService: UtilityService,
    private readonly productServie: ProductsService
  ) {}

  ngOnInit(): void {
    this.selectedVariant = this.product.variants[0];
    this.selectedSize = this.selectedVariant.Sizes[0].SizeName;
  }

  get currency() {
    return this.utilityService.selectedCurrency.split(' ')[1];
  }

  selectVariant(variant: IProductVariants) {
    this.selectedVariant = variant
  }

  selectSize(size: string) {
    this.selectedSize = size
  }

  increaseQuantity() {
    this.product.quantity++;
    this.updateProductList();
  }

  decreaseQuantity() {
    this.product.quantity--;
    this.updateProductList();
  }

  updateProductList() {
    this.productServie.updateProductList(this.product);
  }

  navigateToProductPage() {
    this.utilityService.hideCart()
  }

}

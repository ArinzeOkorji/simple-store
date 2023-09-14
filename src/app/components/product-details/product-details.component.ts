import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { AppModule } from 'src/app/app.module';
import { IProduct, IProductVariants } from 'src/app/interface/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productID: any;
  product!: IProduct;
  selectedVariant!: IProductVariants;
  selectedSize!: string;
  variants: IProductVariants[] = [];
  selectedImg!: string;
  loading: boolean = false;
  subscriptions$ = new Subscription();

  constructor(
    private readonly productService: ProductsService,
    private readonly route: ActivatedRoute,
    private readonly utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.route.params
    .subscribe({
      next: (param) => {
        this.productID = param['id'];
        this.getProductByID();
      }
    })
  }

  getProductByID() {
    this.loading = true;
    this.subscriptions$.add(
      this.productService.getProductByID(this.productID)
    .subscribe({
      next: (res) => {
        this.loading = false;
        this.product = res;
        this.selectedVariant = this.product.variants[0];
        //console.log(this.selectedVariant.ProductImages, [...new Map(...this.selectedVariant.ProductImages)]);
        
        this.selectedVariant.ProductImages = [...new Set(this.selectedVariant.ProductImages)]
        this.selectedSize =  this.selectedVariant.Sizes[0].SizeName;
        this.selectedImg = this.selectedVariant.ProductImages[0]
      },
      error: (err) => {
        this.loading = false;}
    })
    )
  }
  
  get currency() {
    return this.utilityService.selectedCurrency.split(' ')[1];
  }

  selectVariant(variant: IProductVariants) {
    this.selectedVariant = variant;
    this.selectedVariant.ProductImages = [...new Set(this.selectedVariant.ProductImages)]
    this.selectedSize =  this.selectedVariant.Sizes[0].SizeName;
    this.selectedImg = this.selectedVariant.ProductImages[0]
  }

  selectSize(size: string) {
    this.selectedSize = size
  }

  selectImg(img: string) {
    this.selectedImg = img;
  }

  addToCart() {
    this.productService.addToCart(this.product);
  }

  removeFromCart() {
    this.productService.removeFromCart(this.product);    
  }

  get isProductInCart() {
    return this.productService.cart.findIndex(product => product.id === this.product?.id);
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}

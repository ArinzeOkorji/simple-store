import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/interface/product';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { PaystackOptions } from 'angular4-paystack';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{
  loading = false;
  @Input()
  fullPage = true;

  cart: IProduct[] = [];

  options!: PaystackOptions;

  subscriptions$ = new Subscription();

  constructor(
    private readonly productService:ProductsService,
    private readonly utilityService: UtilityService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}
  
  ngOnInit(): void {
    
    this.subscriptions$.add(
      this.productService.cart$
    .subscribe({
      next: () => {
        this.cart = this.productService.cart;
      }
    })
    )
    this.productService.cart$.next(true);
        this.productService.calculateTotal();

        this.options = {
          amount: Math.ceil(this.tax + this.total),
          email: 'SID@yopmail.com',
          ref: `${Math.ceil(Math.random() * 10e10)}`
        }
    
    // this.calculateTotal('add');
  }

  calculateTotal(calc: string) {
    if(!this.cart.length) {
      localStorage.removeItem('cart')
    }
  }

  init() {
    console.log(this.total, this.tax);
  }

  get currency() {
    return this.utilityService.selectedCurrency.split(' ')[1];
  }

  get total() {
    return this.productService.total;
  }

  get tax() {
    return this.productService.total * 0.21;
  }

  get quantity() {
    let quantity = 0;
    this.cart.forEach(item => quantity = quantity + item.quantity)
    return quantity;
  }

  goToCart() {
    document.getElementById('dropdown-toggle')?.click();
    this.router.navigate(['/cart']);
  }

  paymentDone(ref: any) {
    this.showSuccess();
    this.productService.emptyCart();
    this.router.navigate(['']);
  }

  showSuccess() {
    this.utilityService.hideCart();
    this.toastr.success('Transaction Successful', 'Your order is on its way!');
  }

  showError() {
    this.toastr.error('Something went wrong', 'Please try again')
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}

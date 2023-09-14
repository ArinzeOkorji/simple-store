import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currencyList: string[] = [];
  
  constructor(
    private readonly utilityService: UtilityService,
    private readonly productService: ProductsService
  ) {
    this.currencyList = this.utilityService.currencyList;
  }

  selectCurrecy(currency: string) {
    this.utilityService.selectCurrency(currency);
  }

  get selectedCurrency() {
    return this.utilityService.selectedCurrency.slice(0,1);
  }

  get cartLength() {
    return this.productService.cart.length;
  }

}

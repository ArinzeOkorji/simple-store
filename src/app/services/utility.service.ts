import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  currencyList = [
    '$ USD',
    '€ EUR',
    '¥ JPY'
  ];
  selectedCurrency = localStorage.getItem('currency') || '$ USD';

  constructor() { }

  selectCurrency(currency: string) {
    localStorage.setItem('currency', currency);
    this.selectedCurrency = currency;
  }

  hideCart() {
    document.getElementById('dropdown-menu')?.classList.contains('show') ? document.getElementById('dropdown-toggle')?.click() : null;
  }
}

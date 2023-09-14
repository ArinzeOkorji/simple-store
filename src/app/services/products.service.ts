import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interface/product';
import { Observable, Subject, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseURL = 'https://apidojo-forever21-v1.p.rapidapi.com';
  cart: IProduct[] = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '') : [];
  cart$ = new Subject();
  total: number = 0;

  constructor(
    private readonly http: HttpClient,
    private readonly toastr: ToastrService
  ) { }

  getProductsInCategory(category: string): Observable<IProduct[]> {
    let params = new HttpParams();
    params = params.set('pageNumber', '1');
    params = params.set('pageSize', '12');
    params = params.set('category', category);

    return this.http.get<IProduct[]>(`${this.baseURL}/products/v2/list`, {
      params
    })
      .pipe(
        map((res: any) => { 
          const newData: IProduct[] = []
          const listOfResult = res['CatalogProducts'];
          listOfResult.forEach((result: any) => {
            const data: IProduct = {
              id: result.ProductId,
              brand: result.Brand,
              title: result.DisplayName,
              price: result.OriginalPrice,
              description: result.Description,
              image: result.DefaultProductImage,
              variants: result.Variants,
              quantity: 1
            }
            newData.push(data)
          })
            return newData
        })
      );
  }

  addToCart(product: IProduct) {
    product.quantity = 1;

    this.cart.findIndex(item => item.id === product.id) === -1 ? this.cart.push(product) : this.showCartMessage();

    this.calculateTotal();

    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cart$.next(true)
  }

  updateProductList(product: IProduct) {
    const index = this.cart.findIndex(p => p.id === product.id);
    product.quantity <= 0 ? this.removeFromCart(product) : this.cart[index] = product;
    
    this.calculateTotal();

        localStorage.setItem('cart', JSON.stringify(this.cart));

    this.cart$.next(true)
  }

  removeFromCart(product: IProduct) {    
    this.cart = this.cart.filter(p => p.id !== product.id);

    localStorage.setItem('cart', JSON.stringify(this.cart));

    this.cart$.next(true)
  }

  calculateTotal() {
    this.total = 0;
    this.cart.forEach((product) => {
      if(product.quantity) {
        this.total = this.total + (product.quantity * product.price);
      }
    })
  }

  getProductByID(id: string) {
    const params = new HttpParams().set('productId', id)
    return this.http.get(`${this.baseURL}/products/v2/detail`, {params})
    .pipe(
      map((result: any) => { 
        const newData: IProduct = {
          id: result.product.ProductId,
          brand: result.product.Brand,
          title: result.product.DisplayName,
          price: result.product.OriginalPrice,
          description: result.product.Description,
          image: result.product.DefaultProductImage,
          variants: result.product.Variants,
          quantity: 1
        }
        return newData;
      })
    );
  }

  emptyCart() {
    this.cart = [];
    this.cart$.next(true);
    localStorage.removeItem('cart');
  }

  showCartMessage() {
    this.toastr.info('Item already in your cart')
  }
}

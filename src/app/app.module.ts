import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component'
import { HTTPInterceptor } from './interceptor/http.interceptor';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartComponent } from './components/cart/cart.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { Angular4PaystackModule } from 'angular4-paystack';
import { environment } from 'src/environments/environment.development';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    CartItemComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Angular4PaystackModule.forRoot(environment.paystack_token),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      useClass: HTTPInterceptor,
      provide: HTTP_INTERCEPTORS,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [TruncatePipe]
})
export class AppModule { }

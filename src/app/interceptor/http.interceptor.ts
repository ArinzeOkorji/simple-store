import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let clone = request.clone({
      headers: request.headers.set('X-RapidAPI-Key', 'b4013f5bc4msh7684eff05832304p194781jsn95f612546906').set('X-RapidAPI-Host', 'apidojo-forever21-v1.p.rapidapi.com')
    });
    return next.handle(clone);
  }
}

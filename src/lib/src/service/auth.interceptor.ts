import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from './token.service';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenSvc: TokenService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    console.log(this.tokenSvc);

    const authReq = req.clone({ setHeaders: this.tokenSvc.authHeader });
    
    return next.handle(authReq).do((
      event: HttpEvent<any>) => {}, 
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          //this.loginSvc.logout();
        }
      }
    });
    
    //return next.handle(authReq);
  }
}
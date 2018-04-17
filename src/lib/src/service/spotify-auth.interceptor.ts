import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/do';

import { TokenService } from './token.service';

@Injectable()
export class SpotifyAuthInterceptor implements HttpInterceptor {
  constructor(private tokenSvc: TokenService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authReq = req.clone({ setHeaders: this.tokenSvc.authHeader });

    return next.handle(authReq).do((
      event: HttpEvent<any>) => {}, 
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // this.tokenSvc.clearToken();
        }
      }
    });
  }
}
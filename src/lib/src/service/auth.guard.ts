import { Injectable } from '@angular/core';
import { CanActivate, Route, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SpotifyAuthResponse } from '../shared/spotify-auth-response.i';
//import { LoginService } from './login.service';

import { fromPairs } from 'lodash';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private tokenSvc: TokenService){}
  
  public canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
    return this.canActivateChild(next, state);
  }

  // This gets called when the callback is invoked. Token is part of Auth
  public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
    const response = this.extractApiResponse(next.fragment);
    if(response){
      this.tokenSvc.setAuthToken(response);
    }
    window["TS"] = this.tokenSvc;
    console.log(window["TS"])
    return !!response;
  }

  private extractApiResponse(fragment: string): SpotifyAuthResponse | null{
    if(!!fragment){
      return fromPairs(fragment.split('&').map((s) => s.split('='))) as SpotifyAuthResponse;
    }
    return null;
  }
}

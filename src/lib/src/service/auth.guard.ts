import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { fromPairs } from 'lodash';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { SpotifyAuthResponse } from '../shared/spotify-auth-response.i';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private tokenSvc: TokenService){}
  
  public canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
    return this.canActivateChild(next, state);
  }

  public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
    const response = this.extractApiResponse(next.fragment);
    if(response){
      this.tokenSvc.setAuthToken(response);
    }
    return !!response;
  }

  private extractApiResponse(fragment: string): SpotifyAuthResponse | null{
    if(!!fragment){
      return fromPairs(fragment.split('&').map((s) => s.split('='))) as SpotifyAuthResponse;
    }
    return null;
  }
}

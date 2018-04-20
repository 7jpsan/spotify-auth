import { Injectable } from '@angular/core';

import { AuthConfig } from '../shared/spotify-auth-config.i';
import { SpotifyAuthResponse } from '../shared/spotify-auth-response.i';
import { ScopesBuilder } from '../shared/scopes-builder';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private requestAuthUrl = 'https://accounts.spotify.com/authorize';
  private authorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  private authConfig: AuthConfig = { 
    client_id: "3af5f43840144db2a5ef883b56c5fb7e",  // WebPortal App Id. Shoud be config
    response_type: "token",
    redirect_uri: "http://localhost:3000/authorized",  // My URL
    state: "",
    show_dialog: true,
    scope: new ScopesBuilder().build()
  };

  public authorize(){ 
    window.location.href = this.buildAuthUrl();
  }

  //Signal someone, that router can navigate somewhere
  public authorized(): void{
    console.log('Called auth');
    this.authorized$.next(true);
  }

  public get authorizedStream(): Observable<boolean>{
    return this.authorized$.asObservable();
  }
  
  public configure(config: AuthConfig): AuthService{
    // Validate Config
    this.authConfig = config;
    return this;
  }

  private buildAuthUrl(): string{

    let params = [];
    for (const [key, value] of Object.entries(this.authConfig)) {
      if(typeof(value) == 'object'){
        params.push(`${key}=${(value as string[]).join(" ")}`);
      }else{
        params.push(`${key}=${value}`);
      }
    }

    return `${this.requestAuthUrl}?${params.join('&')}`;
  }
}

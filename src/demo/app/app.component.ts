import { Component } from '@angular/core';
import { AuthService, ScopesBuilder, AuthConfig, TokenService } from 'spotify-auth';
import { InfoService } from './info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html',
  styles: [
    `
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #333;
      position: -webkit-sticky; /* Safari */
      position: sticky;
      top: 0;
  }
  
  li {
      float: left;
  }
  
  li a {
      display: block;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
  }
  
  li a:hover {
      cursor: pointer;
      background-color: #1db26b;
  }
  
  .active {
      background-color: #4CAF50;
  }
    `
  ]
})
export class AppComponent {

  constructor(
    private infoSvc: InfoService,
    private tokenSvc: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  public getUserInfo(): void{
  }

  public logout(): void{
    this.tokenSvc.clearToken();
    this.router.navigate(['login']);
  }
}

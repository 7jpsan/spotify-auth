import { Component, OnInit } from '@angular/core';
import { LibService, AuthService, ScopesBuilder, AuthConfig, TokenService } from 'quickstart-lib';
import { InfoService } from './info.service';
// import { AuthService } from 'quickstart-lib';

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
      background-color: #111;
  }
  
  .active {
      background-color: #4CAF50;
  }
    `
  ]
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    //console.log(`AuthToken: ${this.tokenSvc.oAuthToken}`);
  }
  meaning: number;
  constructor(
    private infoSvc: InfoService,
    private tokenSvc: TokenService,
    private libService: LibService, 
    private authService: AuthService) {
    this.meaning = libService.getMeaning();
  }

  public getUserInfo(): void{
  }

  public logout(): void{
    this.tokenSvc.clearToken();
  }
}

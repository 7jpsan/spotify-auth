import { Component, OnInit } from '@angular/core';
import { AuthService, ScopesBuilder, AuthConfig, TokenService } from 'spotify-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <span>Login with</span>
  <div class="img-container">
    <img src="assets/spotify.png" (click)="login($event)" />
  </div>`,
  styles: [`
  :host{
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

    margin: auto;
    text-align: center;
    outline: dashed beige thin;
    background: white;
    width: 25%;
    padding: 1rem 4rem;
    margin-top: 10%;
}

.img-container{
    margin: 3rem 0;
}

.img-container img{
    min-width: 70px;
    width: 70%;
    object-fit: contain;
}

.img-container:hover{
    cursor: pointer;
    object-fit: contain;
}

span{
    font-size: x-large;
    font-weight: bold;
    flex: 1 auto;
}

label:hover{
    text-decoration: underline;
    color: blue;
    cursor: pointer;
}
  `]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private tokenSvc: TokenService, private router: Router) { }

  ngOnInit() {
    if(!!this.tokenSvc.oAuthToken){
      this.router.navigate(['user']);
    }
  }

  public login(): void {
    const scopes = new ScopesBuilder()/* .withScopes(ScopesBuilder.LIBRARY) */.build();
    const ac: AuthConfig = {
      client_id: "3af5f43840144db2a5ef883b56c5fb7e",  // WebPortal App Id. Shoud be config
      response_type: "token",
      redirect_uri: "http://localhost:3000/authorized",  // My URL
      state: "",
      show_dialog: true,
      scope: scopes
    };
    this.authService.configure(ac).authorize();
  }
}

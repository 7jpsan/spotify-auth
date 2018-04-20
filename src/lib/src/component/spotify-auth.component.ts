import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'spotify-auth',
  template: `<h3>Authorizing&hellip;</h3>`,
  styles: [``]
})
export class SpotifyAuthComponent implements OnInit {
  
  public constructor(private authService: AuthService){}

  public ngOnInit(): void {
    //Send it back to app home
    this.authService.authorized();
  }
}

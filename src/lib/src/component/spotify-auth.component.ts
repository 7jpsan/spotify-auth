import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'spotify-auth',
  template: `<h3>Authorizing&hellip;</h3>`,
  styles: [``]
})
export class SpotifyAuthComponent implements OnInit {
  
  public constructor(private router: Router){}

  public ngOnInit(): void {
    //Send it back to app home
    this.router.navigate(['']); 
  }
}

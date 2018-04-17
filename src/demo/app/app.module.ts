import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SpotifyAuthModule } from 'spotify-auth';

import { AppComponent }  from './app.component';
import { InfoService }  from './info.service';
import { Router, Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user.component';
import { LoginComponent } from './login.component';
import { AlbumsComponent } from './albums.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'albums',
    component: AlbumsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports:      [ 
    BrowserModule,
    HttpClientModule,
    SpotifyAuthModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [ AppComponent, UserComponent, LoginComponent, AlbumsComponent ],
  bootstrap:    [ AppComponent ],
  exports: [RouterModule],
  providers: [InfoService]
})
export class AppModule {
  // constructor(router: Router){
  //   console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  // }
 }

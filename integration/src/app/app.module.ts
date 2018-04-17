import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SpotifyAuthModule } from 'spotify-auth';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, SpotifyAuthModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

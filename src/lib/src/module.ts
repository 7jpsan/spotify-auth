import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';

import { SpotifyAuthComponent } from './component/spotify-auth.component';
import { AuthService } from './service/auth.service';
import { TokenService } from './service/token.service';
import { AuthGuard } from './service/auth.guard';

const routes: Routes= [{
  path: 'authorized',
  canActivate: [ AuthGuard ],
  component: SpotifyAuthComponent
}];

@NgModule({
  declarations: [SpotifyAuthComponent],
  providers: []
})
export class SpotifyAuthModule { 

  public static authRoutes(): Routes {
    return routes;
  }

  public static forRoot() : ModuleWithProviders {
    return {
      ngModule: SpotifyAuthModule,
      providers: [ 
        AuthService,
        TokenService,
        AuthGuard
      ]
    }
  }
}

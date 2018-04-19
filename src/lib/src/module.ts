import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { SpotifyAuthComponent } from './component/spotify-auth.component';
import { AuthService } from './service/auth.service';
import { TokenService } from './service/token.service';
import { AuthGuard } from './service/auth.guard';
import { SpotifyAuthInterceptor } from './service/spotify-auth.interceptor';

const routes: Routes= [{
  path: 'authorized',
  canActivate: [ AuthGuard ],
  component: SpotifyAuthComponent
}];

@NgModule({
  declarations: [SpotifyAuthComponent],
  providers: [
    AuthService,
    TokenService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpotifyAuthInterceptor, //Force interception.
      multi: true
    }
  ],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class SpotifyAuthModule { }

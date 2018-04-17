import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LibComponent } from './component/lib.component';
import { LibService } from './service/lib.service';
import { AuthService } from './service/auth.service';
import { TokenService } from './service/token.service';
import { AuthGuard } from './service/auth.guard';
import { AuthInterceptor } from './service/auth.interceptor';

const routes: Routes= [{
  path: 'authorized',
  canActivate: [ AuthGuard ],
  component: LibComponent
}];

@NgModule({
  declarations: [LibComponent],
  providers: [
    LibService,
    AuthService,
    TokenService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, //Force interception.
      multi: true
    }
  ],
  exports: [LibComponent, RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class LibModule { }

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InfoService } from './info.service';
import { isEmpty } from 'lodash';
import { TokenService } from 'quickstart-lib';
import { take } from 'rxjs/operators/take';
import { switchMap } from 'rxjs/operators/switchMap';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'user-info',
  template: `
    <div *ngIf="hasUser(user)">
      <pre>{{jUser}}</pre>
    </div>
  `,
  styles: [``]
})
export class UserComponent implements OnInit , OnDestroy{
 
  public constructor(private infoSvc: InfoService, private tokenSvc: TokenService){}
  
  private stream: Subscription | null = null;
  
  ngOnDestroy(): void {
    if(this.stream){
      this.stream.unsubscribe();
    }
  }
  ngOnInit(): void {
   
    const stream = this.tokenSvc.authTokens.pipe(switchMap(() => this.infoSvc.getUserInfo()));
    this.stream = stream.subscribe((x) => this.user = x);
    // this.tokenSvc.authTokens.subscribe(() => {
    //   this.infoSvc.getUserInfo().subscribe( y => {
    //     this.user = y;
    //   });
    // }); 
  }


  public user: {} = {};

  public hasUser(): boolean{
    return !isEmpty(this.user);
  }

  public get jUser(): {} {
    return JSON.stringify(this.user, null, 2);
  }
}

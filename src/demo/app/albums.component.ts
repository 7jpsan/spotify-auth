import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InfoService } from './info.service';
import { omit } from 'lodash';
import { isEmpty } from 'lodash';
import { TokenService } from 'spotify-auth';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'albums-info',
  template: `
    <div *ngIf="hasAlbums(albums)">
      <pre>{{jAlbums}}</pre>
    </div>
  `,
  styles: [``]
})
export class AlbumsComponent implements OnInit , OnDestroy{
 
  public constructor(private infoSvc: InfoService, private tokenSvc: TokenService){}
  
  private stream: Subscription | null = null;
  private albums: {} = {};
  
  ngOnDestroy(): void {
    if(this.stream){
      this.stream.unsubscribe();
    }
  }
  ngOnInit(): void {
   
    this.infoSvc.fetchUserAlbums().subscribe((x:any) => {
      if(x.items){
        this.albums = x.items.map((y:any) => omit(y.album, ['available_markets', 'tracks.items']));
      }else{
        this.albums = x;
      }
    });
  }

  public hasAlbums(): boolean{
    return !isEmpty(this.albums);
  }

  public get jAlbums(): {} {
    return JSON.stringify(this.albums, null, 2);
  }
}

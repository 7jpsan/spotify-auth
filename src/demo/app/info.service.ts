import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators/tap';
import { of } from 'rxjs/observable/of';

import { Router } from '@angular/router';

@Injectable()
export class InfoService {

  private apiUserUrl: string = 'https://api.spotify.com/v1/me';
  private apiAlbumsUrl: string = 'https://api.spotify.com/v1/me/albums';

  private user: {} = {};
  private user$: BehaviorSubject<{}>;

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.user$ = new BehaviorSubject<{}>(this.user);
  }

  public fetchUserInfo(): Observable<{}> {
    return this.http.get(this.apiUserUrl).pipe(
      tap((user: {}) => {
        this.user$.next(this.user); 
      }),
      catchError(this.handleError('getSelf'))
    );
  }

  public fetchUserAlbums(): Observable<{}>{
    return this.http.get(this.apiAlbumsUrl).pipe(
      tap((user: {}) => {
        this.user$.next(this.user); 
      }),
      catchError(this.handleError('getSelfAlbums'))
    );
  }

  public getUserStream(): Observable<{}> {
    return this.user$.asObservable();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      (result as any) = error;
      return of(result as T);
    };
  }


}

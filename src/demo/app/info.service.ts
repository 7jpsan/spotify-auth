import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { of } from 'rxjs/observable/of';

import { Router } from '@angular/router';
//import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InfoService {

  private apiUrl: string = 'https://api.spotify.com/v1/me';

  private user: {} = {};
  private user$: BehaviorSubject<{}>;

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.user$ = new BehaviorSubject<{}>(this.user);
  }

  public getUserInfo(): Observable<{}> {
    return this.http.get(this.apiUrl).pipe(
      tap((user: {}) => {
        this.user$.next(this.user); 
      }),
      tap(response => console.log(`tried`, response)),
      catchError(this.handleError('getSelf'))
    );
  }

  public getUserStream(): Observable<{}> {
    return this.user$.asObservable();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      // this.user = new User({ isLoggedIn: false, token: '' } as User);
      // this.user.setLoggedIn(false);
      // this.cookieSvc.delete('spotify-user');
      (result as any) = error;
      return of(result as T);

    };
  }


}


# Demo
https://7jpsan.github.io/spotify-auth-demo/


# Spotify Auth - Angular 5

This is a simple library that handles the authentication workflow for an angular 5 application interacting with angular api in a JS only environment, no backend service is required!

Features (v2+):
- An auth library for spotify api v1 and angular 5
- A demo application that exemplifies the use.

Coming next:
 - Handle token expiration / invalidity
 - Handle session persistence 

## Difference of this fork
This is a fork/implementation of https://github.com/cyrilletuzi/angular-quickstart-lib which was forked from https://github.com/filipesilva/angular-quickstart-lib go ahead and read their work, it is awesome!

## Gotchas
After a lot of time, using the `@angular/router` and/or `RouterModule` in a library is quite complicated... I have decided to remove it and expose the mechanisms to the consumer app. 

## Requirements 
Make sure you have at least Node 6.9 and NPM 3.0 installed.

## Install
`npm install spotify-auth`

## Usage

- Inherit the http Interceptor  `spotify-auth.interceptor.ts`
	```typescript
	import { Injectable } from  '@angular/core';
	import  'rxjs/add/operator/do'; //Required, yes!
	import { TokenService, SpotifyAuthInterceptor } from  'spotify-auth';

	@Injectable()
	export  class  SpotifyAuthInterceptor2  extends  SpotifyAuthInterceptor {
		
		doOnError(err:  any):  void {}
		
		constructor(tokenSvc:  TokenService) {
			super(tokenSvc);
		}
	}
	```
	
- Listen for the `authService.authorizedStream` and route accordingly. When the login is complete, the stream will emit a true value, which means everything is ok (it hit the `authorized` url with the right stuff, you should now go to a route you have defined in your router module.
	
	`app.component.ts`
	```typescript
	import { Component, OnInit } from  '@angular/core';
	import { AuthService, ScopesBuilder, AuthConfig, TokenService } from  'spotify-auth';
	...
	constructor(
		private  infoSvc:  InfoService,
		private  tokenSvc:  TokenService,
		private  authService:  AuthService,
		private  router:  Router
	) {}

	ngOnInit():  void {
		this.authService.authorizedStream.pipe(filter(x  =>  x)).subscribe(() => {
			this.router.navigate(['user']);	
		});
	}
	...
	```

- Create an `authorize/login` method that uses the module:
`login.component.ts`
	```typescript
		import { Component, OnInit } from  '@angular/core';
		import { AuthService, ScopesBuilder, AuthConfig } from 'spotify-auth';
		...
		@Component({...});
		export class SomeClass(){
			constructor(
				private  authService:  AuthService,
				private  tokenSvc:  TokenService,
				private  router:  Router) { }
			...
			public  login():  void {
				const scopes = new ScopesBuilder()/* .withScopes(ScopesBuilder.LIBRARY) */.build();
					const ac:  AuthConfig  = {
						// WebPortal App Id. Your application id from spotify
						client_id:  "3af5f43840144db2a5ef883b56c5fb7e", 
						response_type:  "token",
						// Whitelisted URL, must end with the authozed path for the magic to happen.
						//i.e:(http://your-domain/yourapp/authorized Or http://localhost:4200/authorized)
						redirect_uri:  "http://7jpsan.github.io/spotify-auth-demo/authorized", 
						state:  "",
						show_dialog:  true,
						scope:  scopes
					};
					this.authService.configure(ac).authorize(); // Magic happens here
			}
		}
	```
	
- `app.module.ts` and/or `app-routing.module.ts` :
	```typescript
		import { NgModule, Injectable } from  '@angular/core';
		...
		import { SpotifyAuthModule } from  'spotify-auth';
		import { SpotifyAuthInterceptor2 } from  './spotify-auth.interceptor';

	    const  routes:  Routes  = [

	{
		path:  '',
		redirectTo:  'user',
		pathMatch:  'full'
	},
	{
		path:  'user',
		component:  UserComponent
	},
	...,
		SpotifyAuthModule.authRoutes()[0] //(Static guarded route with component)
	];
	NgModule({
		imports: [
		BrowserModule,
		HttpClientModule,
		HttpModule,
		SpotifyAuthModule.forRoot(),  //forRoot!!!!
		RouterModule.forRoot(routes),
		],
		declarations: [ AppComponent, UserComponent, LoginComponent, AlbumsComponent ],
		bootstrap: [ AppComponent ],
		exports: [],
		providers: [
				InfoService,
				{
					provide:  HTTP_INTERCEPTORS,
					//Force interception to use your new shiny headers!
					useClass:  SpotifyAuthInterceptor2,
					multi:  true
				}
			]
		})
	export  class  AppModule {}
	```

That is it! The code should take care of the rest for you. Enjoy! There is a demo app in the package somewhere.

If anything goes wrong, please raise an issue!

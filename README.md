# Spotify Auth - Angular 5

This is a simple library that handles the authentication workflow for an angular 5 application interacting with angular api in a JS only environment, no backend service is required!

Features:
- An auth library for spotify api v1 and angular 5
- A demo application that exemplifies the use.

## Difference of this fork
This is a fork/implementation of https://github.com/cyrilletuzi/angular-quickstart-lib which was forked from https://github.com/filipesilva/angular-quickstart-lib go ahead and read their work, it is awesome!

## Requirements 
Make sure you have at least Node 6.9 and NPM 3.0 installed.

## Install
`npm install spotify-auth`

## Usage

Import the required pieces:

```typescript
import { AuthService, ScopesBuilder, AuthConfig, TokenService } from 'spotify-auth';
export class BlahBlah{
...
...
public authMethod(): void {
    const scopes = new ScopesBuilder().build();
    const ac: AuthConfig = {
      client_id: "xxxxxxxxxxxxxxxxxxxxxxxxxx",  // WebPortal App Id. Shoud be config
      response_type: "token",
      redirect_uri: "http://localhost:3000/authorized",  // URL you want to use. Currently it needs to have the authorized bit at the end. TODO: Change it
      state: "some_random_state",
      show_dialog: true,
      scope: scopes
    };
    this.authService.configure(ac).authorize();
  }

}
```
That is it, the code should take care of the rest for you. Enjoy! There is a demo app in the package somewhere.
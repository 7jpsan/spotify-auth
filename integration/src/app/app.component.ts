import { Component } from '@angular/core';

@Component({
  selector: 'integration-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  meaning: number= 42;
  constructor() {
  }
}

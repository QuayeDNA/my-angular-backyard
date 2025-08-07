import { Component } from '@angular/core';
import { PresentationComponent } from './presentation/presentation/presentation';

@Component({
  selector: 'app-root',
  imports: [PresentationComponent],
  template: `<app-presentation />`,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class AppComponent {}
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-catalog></app-catalog><router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'oraculo-de-filmes';
}

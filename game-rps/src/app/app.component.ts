import { Component } from '@angular/core';
import { GameRpsMenuPageComponent } from './pages/game-rps-menu-page/game-rps-menu-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameRpsMenuPageComponent],
  template: `
    <game-rps-menu-page>
    </game-rps-menu-page>
  `,
  styles: [],
})
export class AppComponent {}

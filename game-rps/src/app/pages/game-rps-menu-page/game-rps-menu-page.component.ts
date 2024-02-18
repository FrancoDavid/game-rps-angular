import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameRpsMenuComponent } from '../../components/game-rps-menu/game-rps-menu.component';
import { RouterOutlet } from '@angular/router';
import { backInDown } from '../../global/animations.global';

@Component({
    selector: 'game-rps-menu-page',
    animations: [backInDown],
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        GameRpsMenuComponent,
    ],
    template: `
        <game-rps-menu [@backInDown]></game-rps-menu>
        <router-outlet></router-outlet>
    `,
    styleUrl: './game-rps-menu-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class GameRpsMenuPageComponent { }

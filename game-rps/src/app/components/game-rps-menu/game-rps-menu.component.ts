import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GameType } from '../../types/game-type.type';

@Component({
    selector: 'game-rps-menu',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
    template: `
        <header>
            <h1>Rock Paper Scissor Game</h1>
            <section *ngIf="!menu.inGameProcess">
                <button (click)="onClickPlay('/selection', 'normal')">Play Normal!</button>
                <button (click)="onClickPlay('/selection', 'sheldon')">Play with Sheldon!</button>
            </section>

            <section *ngIf="menu.inGameProcess">
                <button (click)="onClickReset()">Reset</button>
            </section>
        </header>
    `,
    styleUrl: './game-rps-menu.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRpsMenuComponent {

    public menu: {
        inGameProcess: boolean;
    }

    constructor(private _router: Router) {
        this.menu = {
            inGameProcess: false
        };
    }

    private _setInGameProcess(route: string): void {
        this.menu.inGameProcess = (route === '/selection');
    }

    public onClickPlay(route: string, type: GameType): void {
        this._router.navigate([route, type]);
        this._setInGameProcess(route);
    }

    public onClickReset(): void {
        this._router.navigate(['']);
        this._setInGameProcess('');
    }
}

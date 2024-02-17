import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GameType } from '../../types/game-type.type';
import { GameRpsService } from '../../services/game-rps.service';

@Component({
    selector: 'game-rps-menu',
    standalone: true,
    imports: [
        CommonModule
    ],
    template: `
        <header>
            <h1>Rock Paper Scissor Game</h1>
            <section *ngIf="!menu.inGameProcess">
                <button class="btn-inline" (click)="onClickPlay('/selection', 'normal')">Play Normal!</button>
                <button class="btn-inline" (click)="onClickPlay('/selection', 'sheldon')">Play with Sheldon!</button>
            </section>

            <section *ngIf="menu.inGameProcess">
                <button class="btn-inline" (click)="onClickReset()">Quit</button>
            </section>
        </header>
    `,
    styleUrl: './game-rps-menu.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRpsMenuComponent implements OnInit {

    public menu: {
        inGameProcess: boolean;
    }

    constructor(private _gameService: GameRpsService,
                private _changeRef: ChangeDetectorRef) {
        this.menu = {
            inGameProcess: false
        };
    }

    ngOnInit(): void {
        this._gameService.getNotificationReset$()
            .subscribe(() => {
                this.menu.inGameProcess = false;
                this._changeRef.markForCheck();
            })
    }

    public onClickPlay(route: string, type: GameType): void {
        this.menu.inGameProcess = (route === '/selection');
        this._gameService.playGame(type);
    }

    public onClickReset(): void {
        this.menu.inGameProcess = false;
        this._gameService.resetGame();
    }
}

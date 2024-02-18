import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GameType } from '../../types/game-type.type';
import { GameRpsSelectorComponent } from '../../components/game-rps-selector/game-rps-selector.component';
import { GameRpsScoreComponent } from '../../components/game-rps-score/game-rps-score.component';
import { GameOption } from '../../types/game-option.type';
import { GameRpsService } from '../../services/game-rps.service';

@Component({
    selector: 'game-rps-selector-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,

        GameRpsSelectorComponent,
        GameRpsScoreComponent
    ],
    template: `

        <game-rps-score
            [options]="gameConfig.options">
        </game-rps-score>

        <aside class="game-config-container" *ngIf="gameConfig.mode === 'normal'">
            <section class="selector-contain--between">
                <game-rps-selector [mode]="gameConfig.options[1]" (eventClick)="onClickSelector($event)"></game-rps-selector>
                <game-rps-selector [mode]="gameConfig.options[2]" (eventClick)="onClickSelector($event)"></game-rps-selector>
            </section>

            <section class="selector-contain--center">
                <game-rps-selector [mode]="gameConfig.options[0]" (eventClick)="onClickSelector($event)"></game-rps-selector>
            </section>
        </aside>

        <aside class="game-config-container" *ngIf="gameConfig.mode === 'sheldon'">
            <section class="selector-contain--center">
                <game-rps-selector [mode]="gameConfig.options[0]" (eventClick)="onClickSelector($event)"></game-rps-selector>
            </section>
            <section class="selector-contain--between">
                <game-rps-selector [mode]="gameConfig.options[1]" (eventClick)="onClickSelector($event)"></game-rps-selector>
                <game-rps-selector [mode]="gameConfig.options[2]" (eventClick)="onClickSelector($event)"></game-rps-selector>
            </section>
            <section class="selector-contain--around">
                <game-rps-selector [mode]="gameConfig.options[3]" (eventClick)="onClickSelector($event)"></game-rps-selector>
                <game-rps-selector [mode]="gameConfig.options[4]" (eventClick)="onClickSelector($event)"></game-rps-selector>
            </section>
        </aside>
    `,
    styleUrl: './game-rps-selector-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRpsSelectorPageComponent implements OnInit {

    public gameConfig: {
        options: Array<GameOption>;
        mode: GameType | null
    };

    constructor(private _activeRoute: ActivatedRoute,
                private _router: Router,
                private _gameService: GameRpsService) {
        this.gameConfig = {
            options: [],
            mode: null
        };
    }

    ngOnInit(): void {
        this._gameService.setGameType((this._activeRoute.snapshot.paramMap.get('type') as GameType));
        this._gameService.setGameOptions();

        this.gameConfig.mode = this._gameService.getGameType();
        this.gameConfig.options = this._gameService.getOptions();
    }

    public onClickSelector(event: GameOption | null): void {
        this._router.navigate(['/result', event]);
    }

}

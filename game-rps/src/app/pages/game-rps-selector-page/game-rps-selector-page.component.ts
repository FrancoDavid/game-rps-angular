import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GameType } from '../../types/game-type.type';
import { GameRpsSelectorComponent } from '../../components/game-rps-selector/game-rps-selector.component';
import { GameRpsScoreComponent } from '../../components/game-rps-score/game-rps-score.component';
import { GameOption } from '../../types/game-option.type';

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
            <section class="selector-contain--center">
                <game-rps-selector [mode]="gameConfig.options[0]" (eventClick)="onClickSelector($event)"></game-rps-selector>
            </section>
            <section class="selector-contain--between">
                <game-rps-selector [mode]="gameConfig.options[1]" (eventClick)="onClickSelector"></game-rps-selector>
                <game-rps-selector [mode]="gameConfig.options[2]" (eventClick)="onClickSelector"></game-rps-selector>
            </section>
        </aside>
    `,
    styleUrl: './game-rps-selector-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRpsSelectorPageComponent implements OnInit {

    public gameConfig: {
        options: Array<GameOption>;
        mode: GameType
    };

    constructor(private _activeRoute: ActivatedRoute,
                private _router: Router) {
        this.gameConfig = {
            options: [],
            mode:   (this._activeRoute.snapshot.paramMap.get('type') as GameType)
        };
    }

    ngOnInit(): void {
        if (this.gameConfig.mode === 'normal') {
            this.gameConfig.options = ['paper', 'rock', 'scissor'];
        } else {
            this.gameConfig.options = [];
        }
    }

    public onClickSelector(event: GameOption | null): void {
        this._router.navigate(['/result', event]);
    }



}

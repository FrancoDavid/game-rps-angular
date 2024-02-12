import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GameType } from '../../types/game-type.type';
import { GameRpsSelectorComponent } from '../../components/game-rps-selector/game-rps-selector.component';

@Component({
    selector: 'game-rps-selector-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,

        GameRpsSelectorComponent
    ],
    template: `
        <aside class="game-config-container" *ngIf="gameConfig.mode === 'normal'">
            <section class="selector-contain--center">
                <game-rps-selector [mode]="gameConfig.options[0]"></game-rps-selector>
            </section>
            <section class="selector-contain--between">
                <game-rps-selector [mode]="gameConfig.options[1]"></game-rps-selector>
                <game-rps-selector [mode]="gameConfig.options[2]"></game-rps-selector>
            </section>
        </aside>
    `,
    styleUrl: './game-rps-selector-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRpsSelectorPageComponent implements OnInit {

    public gameConfig: {
        options: Array<'paper' | 'rock' | 'scissor'>;
        mode: GameType
    };

    constructor(private _router: ActivatedRoute) {
        this.gameConfig = {
            options: [],
            mode:   (this._router.snapshot.paramMap.get('type') &&
                    this._router.snapshot.paramMap.get('type') === 'sheldon') ? 'sheldon' : 'normal'
        };
    }

    ngOnInit(): void {
        if (this.gameConfig.mode === 'normal') {
            this.gameConfig.options = ['paper', 'rock', 'scissor'];
        } else {
            this.gameConfig.options = [];
        }
    }



}

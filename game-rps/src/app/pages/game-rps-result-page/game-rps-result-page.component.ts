import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameRpsSelectorComponent } from '../../components/game-rps-selector/game-rps-selector.component';
import { ActivatedRoute } from '@angular/router';
import { GameOption } from '../../types/game-option.type';

@Component({
    selector: 'game-rps-result-page',
    standalone: true,
    imports: [
        CommonModule,
        GameRpsSelectorComponent
    ],
    template: `
        <section class="result-container"> 
            <aside>
                <game-rps-selector [mode]="result.optionChooser"></game-rps-selector>
            </aside>
            <aside>
                <h2 *ngIf="result.isWinner">You win</h2>
                <h2 *ngIf="!result.isWinner">You lose</h2>
                <button>Next Round</button>
            </aside>
            <aside>
                <game-rps-selector [mode]="result.optionHouse"></game-rps-selector>
            </aside>
        </section>
    `,
    styleUrl: './game-rps-result-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRpsResultPageComponent implements OnInit {

    public result: {
        optionChooser: GameOption | null,
        optionHouse: GameOption | null,
        isWinner: boolean
    };

    private OPTIONS: Array<GameOption> = ['paper', 'rock', 'scissor'];


    constructor(private _activeRouter: ActivatedRoute) {
        this.result = {
            optionChooser: null,
            optionHouse: null,
            isWinner: false
        };
    }
 

    ngOnInit(): void {

        const optionChooser = this._activeRouter.snapshot.paramMap.get('option') as GameOption | null;
        const optionHouse = this.OPTIONS[Math.floor(Math.random() * 3)];

        this.result = {
            optionChooser,
            optionHouse,
            isWinner: this._verifyWinner(optionHouse, optionChooser)
        };

        console.log(this.result);
    }

    private _verifyWinner(optionHouse: GameOption, optionChooser: GameOption | null): boolean {

        if (optionChooser === 'paper') {

            return (optionHouse === 'rock');

        } else if (optionChooser === 'rock') {

            return (optionHouse === 'paper')

        } else if (optionChooser === 'scissor') {

            return (optionHouse === 'paper');

        } else {
            return false;
        }
    }


}

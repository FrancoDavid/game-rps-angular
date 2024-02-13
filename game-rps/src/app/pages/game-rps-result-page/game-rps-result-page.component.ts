import { GameResultTextPipe } from './../../pipes/game-result-text.pipe';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameRpsSelectorComponent } from '../../components/game-rps-selector/game-rps-selector.component';
import { ActivatedRoute } from '@angular/router';
import { GameOption } from '../../types/game-option.type';
import { GameRpsService } from '../../services/game-rps.service';

@Component({
    selector: 'game-rps-result-page',
    standalone: true,
    imports: [
        CommonModule,
        GameRpsSelectorComponent,
        GameResultTextPipe
    ],
    template: `

            <aside class="aside-result">
                <game-rps-selector [mode]="result.optionChooser"></game-rps-selector>
            </aside>

            <aside class="aside-middle">
                <h2>{{result.isWinner | gameResultText}}</h2>
                <button class="btn-inline">Next Round</button>
            </aside>

            <aside class="aside-result">
                <game-rps-selector [mode]="result.optionHouse"></game-rps-selector>
            </aside>
    `,
    styleUrl: './game-rps-result-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRpsResultPageComponent implements OnInit {

    public result: {
        optionChooser: GameOption | null,
        optionHouse: GameOption | null,
        isWinner: number
    };


    constructor(private _activeRouter: ActivatedRoute,
                private _gameService: GameRpsService) {
        this.result = {
            optionChooser: null,
            optionHouse: null,
            isWinner: 0
        };
    }
 

    ngOnInit(): void {

        const optionChooser = this._activeRouter.snapshot.paramMap.get('option') as GameOption | null;
        const optionHouse = this._gameService.calculateChoicePlayerAuto();

        this.result = {
            optionChooser,
            optionHouse,
            isWinner: this._gameService.verifyGameWinner(optionChooser, optionHouse)
        };

        console.log(this.result);
    }

}

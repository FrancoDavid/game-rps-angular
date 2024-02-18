import { GameResultActionPipe } from './../../pipes/game-result-action.pipe';
import { GameResultTextPipe } from './../../pipes/game-result-text.pipe';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameRpsSelectorComponent } from '../../components/game-rps-selector/game-rps-selector.component';
import { ActivatedRoute } from '@angular/router';
import { GameOption } from '../../types/game-option.type';
import { GameRpsService } from '../../services/game-rps.service';
import { fadeDown, fadeIn } from '../../global/animations.global';

@Component({
    selector: 'game-rps-result-page',
    standalone: true,
    imports: [
        CommonModule,
        GameRpsSelectorComponent,
        GameResultTextPipe,
        GameResultActionPipe
    ],
    template: `
        <section [@fadeInDown] class="result-action--container">
            <h3>{{result.optionChooser | gameResultAction: result.optionHouse}}</h3>
        </section>

        <section [@fadeIn] class="result-picked--container">
            <aside>
                <game-rps-selector [mode]="result.optionChooser" [picked]="true"></game-rps-selector>
                <h3>You picked</h3>
            </aside>
            <aside>
                <game-rps-selector [mode]="result.optionHouse"></game-rps-selector>
                <h3>The House picked</h3>
            </aside>
        </section>

        <section [@fadeInDown] class="result-description--container">
            <h2>{{result.isWinner | gameResultText}}</h2>
            <button class="btn-inline--reverse" (click)="onClickNextTurn()">Next Round</button>
        </section>
    `,
    styleUrl: './game-rps-result-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeIn, fadeDown]
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
    }

    public onClickNextTurn(): void {
        this._gameService.nextRound(this.result.isWinner);
    }

}

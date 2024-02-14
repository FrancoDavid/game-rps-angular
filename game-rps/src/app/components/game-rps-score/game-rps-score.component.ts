import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GameOption } from '../../types/game-option.type';
import { GameRpsService } from '../../services/game-rps.service';

@Component({
    selector: 'game-rps-score',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `
        <section class="score-container">
            <div class="score-options">
                <p *ngFor="let option of options">{{option}}</p>
            </div>

            <div class="score-values">
                <p>Round: {{score.round}} </p>
                <p>points</p>
                <p>{{score.userPoints}}-{{score.autoPoints}}</p>
            </div>
        </section>
    `,
    styleUrl: './game-rps-score.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRpsScoreComponent implements OnInit {

    @Input() options: Array<GameOption>;

    public score: {
        userPoints: number,
        autoPoints: number
        round: number
    };

    constructor(private _gameService: GameRpsService) {
        this.options = [];
        this.score = {
            userPoints: 0,
            autoPoints: 0,
            round: 0
        };
    }

    ngOnInit(): void {
        this.score.autoPoints = this._gameService.getAutoPoint();
        this.score.userPoints = this._gameService.getUserPoint();
        this.score.round = this._gameService.getRound();
    }

}

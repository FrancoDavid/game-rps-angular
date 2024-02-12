import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GameOption } from '../../types/game-option.type';

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
                <p>Score</p>
                <p>1/3</p>
            </div>
        </section>
    `,
    styleUrl: './game-rps-score.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRpsScoreComponent {
    
 @Input() options: Array<GameOption>;

 constructor() {
    this.options = [];
 }

}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameOption } from '../../types/game-option.type';

@Component({
    selector: 'game-rps-selector',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `
        <button
            class="btn-selector"
            [ngClass]="{
                'btn-selector--red': mode === 'rock',
                'btn-selector--blue': mode === 'paper',
                'btn-selector--yellow': mode === 'scissor',
                'btn-selector--green': mode === 'lizard',
                'btn-selector--purple': mode === 'spock',

                'btn-selector--shadow': picked
            }"
            (click)="onClick()">
            <img
                [src]="mode === 'rock' ? 'assets/svg/stone-rock-svgrepo-com.svg' :
                        mode === 'paper' ? 'assets/svg/paper-svgrepo-com.svg' :
                        mode === 'scissor' ? 'assets/svg/scissor-svgrepo-com.svg' :
                        mode === 'lizard' ? 'assets/svg/lizard-svgrepo-com.svg' :
                        mode === 'spock' ? 'assets/svg/spock-hand-svgrepo-com.svg' :
                        ''"
                [alt]="mode">
        </button>
    `,
    styleUrl: './game-rps-selector.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRpsSelectorComponent implements OnInit {

    @Input() mode: GameOption | null;
    @Input() picked: boolean;
    @Output() eventClick: EventEmitter<GameOption | null>;

    constructor() {
        this.mode = null
        this.picked = false;

        this.eventClick = new EventEmitter();
    }

    ngOnInit(): void {
    }

    public onClick()  {
        this.eventClick.emit(this.mode)
    }
}

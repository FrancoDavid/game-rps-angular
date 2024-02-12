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
            [ngClass]="button?.style"
            (click)="onClick()">
            <img
                [src]="button?.src"
                [alt]="mode">
        </button>
    `,
    styleUrl: './game-rps-selector.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRpsSelectorComponent implements OnInit {

    @Input() mode: GameOption | null;
    @Output() eventClick: EventEmitter<GameOption | null>;

    public button: {
        style: string,
        src: string
    } | null;

    constructor() {
        this.mode = null
        this.button = null;

        this.eventClick = new EventEmitter();
    }

    ngOnInit(): void {

        this.button = {
            style: this._setStyle(this.mode),
            src: this._setSrc(this.mode),
        };
    }

    private _setStyle(mode: 'rock' | 'paper' | 'scissor' | null): string {
        switch (mode) {
            case 'rock':
                return 'btn-selector--red';
            case 'paper':
                return 'btn-selector--blue';
            case 'scissor':
                return 'btn-selector--yellow';
            default:
                return '';
        }
    }

    private _setSrc(mode: 'rock' | 'paper' | 'scissor' | null): string {
        switch (mode) {
            case 'rock':
                return 'assets/svg/stone-rock-svgrepo-com.svg';
            case 'paper':
                return 'assets/svg/paper-svgrepo-com.svg';
            case 'scissor':
                return 'assets/svg/scissor-svgrepo-com.svg';
            default:
                return '';
        }
    }

    public onClick()  {
        this.eventClick.emit(this.mode)
    }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
        <game-rps-selector></game-rps-selector>
    `,
    styleUrl: './game-rps-selector-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRpsSelectorPageComponent {

    private _gameType: GameType;

    constructor(private _router: ActivatedRoute) {
        this._gameType =  (this._router.snapshot.paramMap.get('type') &&
                           this._router.snapshot.paramMap.get('type') === 'sheldon' ) ? 'sheldon' :'normal';
    }
}

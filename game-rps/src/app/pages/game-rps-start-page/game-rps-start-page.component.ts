import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameRpsModalComponent } from "../../components/game-rps-modal/game-rps-modal.component";
import { GameRpsService } from '../../services/game-rps.service';
import { GameRpsModalService } from '../../services/game-rps-modal.service';

@Component({
    selector: 'game-rps-start-page',
    standalone: true,
    template: `
        <section>
            <h2>Ready to play?</h2>
        </section>
        
        <game-rps-modal></game-rps-modal>
    `,
    styleUrl: './game-rps-start-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        GameRpsModalComponent
    ]
})
export class GameRpsStartPageComponent implements OnInit {

    constructor(private _gameService: GameRpsService,
                private _gameModalService: GameRpsModalService) {
    }

    ngOnInit(): void {
        this._gameService.getNotificationOver$()
            .subscribe((isWinner) => {
                console.log('isWinner', isWinner);
                if (isWinner) {
                    this._gameModalService.openModalWin();
                } else {
                    this._gameModalService.openModalLose();
                }
            });
    }


}

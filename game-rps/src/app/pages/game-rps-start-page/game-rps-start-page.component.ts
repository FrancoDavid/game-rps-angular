import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'game-rps-start-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `
        <section>
            <h2>Ready to play?</h2>
        </section>
    `,
    styleUrl: './game-rps-start-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRpsStartPageComponent { }

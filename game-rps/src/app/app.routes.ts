import { Routes } from '@angular/router';
import { GameRpsStartPageComponent } from './pages/game-rps-start-page/game-rps-start-page.component';
import { GameRpsSelectorPageComponent } from './pages/game-rps-selector-page/game-rps-selector-page.component';
import { GameRpsResultPageComponent } from './pages/game-rps-result-page/game-rps-result-page.component';

export const routes: Routes = [
    {
        path: '',
        component: GameRpsStartPageComponent
    },
    {
        path: 'selection/:type',
        component: GameRpsSelectorPageComponent
    },
    {
        path: 'result/:option',
        component: GameRpsResultPageComponent
    }
];

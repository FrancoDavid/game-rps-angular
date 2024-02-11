import { Routes } from '@angular/router';
import { GameRpsStartPageComponent } from './pages/game-rps-start-page/game-rps-start-page.component';
import { GameRpsSelectorPageComponent } from './pages/game-rps-selector-page/game-rps-selector-page.component';

export const routes: Routes = [
    {
        path: '',
        component: GameRpsStartPageComponent
    },
    {
        path: 'selection/:type',
        component: GameRpsSelectorPageComponent
    }
];

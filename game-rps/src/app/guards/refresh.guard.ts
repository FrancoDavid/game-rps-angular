import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { GameRpsService } from '../services/game-rps.service';

export const refreshGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const gameService = inject(GameRpsService);

  if (!gameService.getIsGaming()) {
    router.navigate(['/']);  
    return false;
  }

  return true;
};

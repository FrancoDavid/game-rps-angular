import { GameType } from './../types/game-type.type';
import { Injectable } from '@angular/core';
import { GameOption } from '../types/game-option.type';
import { OPTIONS_NORMAL, OPTIONS_SHELDON } from '../global/options.global';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, skip } from 'rxjs';


 /**
  * 1. Scissors cuts Paper
  * 2. Paper covers Rock
  * 3. Rock crushes Lizard
  * 4. Lizard poisons Spock
  * 5. Spock smashes Scissors
  * 6. Scissors decapitates Lizard
  * 7. Lizard eats Paper
  * 8. Paper disproves Spock
  * 9. Spock vaporizes Rock
  * 10. Rock crushes Scissors
  *
*/

@Injectable({
  providedIn: 'root'
})
export class GameRpsService {

  private _game: {
    options: Array<GameOption>,
    mode: GameType,
    round: number,
    winner: number,
    userPoints: number,
    autoPoints: number,
    maxRound: number
  };

  private _notificationResetGame: BehaviorSubject<void | null>;
  private _notificationGameOver: BehaviorSubject<boolean>;
  

  constructor(private _router: Router) {
    this._game = {
      options: [],
      mode: 'normal',
      round: 0,
      winner: 0,
      userPoints: 0,
      autoPoints: 0,
      maxRound: 3 
    };
    this._notificationResetGame = new BehaviorSubject<void | null>(null);
    this._notificationGameOver = new BehaviorSubject<boolean>(false);
  }

  public setGameOptions(): void {
    if (this._game.mode === 'normal') {
      this._game.options = [...OPTIONS_NORMAL];

    } else {
      this._game.options = [...OPTIONS_SHELDON];
    }
  }

  public setGameType(gameType: GameType): void {
    this._game.mode = gameType;
  }

  public getOptions(): Array<GameOption> {
    return this._game.options;
  }

  public getGameType(): GameType {
    return this._game.mode;
  }

  public getRound(): number {
    return this._game.round;
  }

  public getUserPoint(): number {
    return this._game.userPoints;
  }

  public getAutoPoint(): number {
    return this._game.autoPoints;
  }

  public getNotificationReset$(): Observable<void | null> {
    return this._notificationResetGame.asObservable();
  }

  public getNotificationOver$(): Observable<boolean> {
    return this._notificationGameOver.asObservable().pipe(skip(1));
  }

  public calculateChoicePlayerAuto(): GameOption {

    if (this._game.mode === 'normal') {
      return this._game.options[Math.floor(Math.random() * 3)];
    } else {
      return this._game.options[Math.floor(Math.random() * 5)];
    }
  }

  public verifyGameWinner(optionPlayer: GameOption | null, optionPlayerAuto: GameOption): number {

    if (optionPlayer === optionPlayerAuto) {
        
      return 0;
    
    } else {

      if (optionPlayer === 'scissor') {
        
        return (optionPlayerAuto === 'rock' || optionPlayerAuto === 'spock') ? -1 : 1;

      } else if (optionPlayer === 'paper') {

        return (optionPlayerAuto === 'scissor' || optionPlayerAuto === 'lizard') ? -1 : 1;

      } else if (optionPlayer === 'rock') {

        return (optionPlayerAuto === 'paper' || optionPlayerAuto === 'spock') ? -1 : 1;
        
      } else if (optionPlayer === 'lizard') {
        
        return (optionPlayerAuto === 'rock' || optionPlayerAuto === 'scissor') ? -1 : 1;

      } else if (optionPlayer === 'spock') {
        
        return (optionPlayerAuto === 'lizard' || optionPlayerAuto === 'paper') ? -1 : 1;

      } else {

        return 1;
      }
    }
  }

  public nextRound(stateWinner: number): void {

    this._game.round++;

    if (stateWinner === 1) {
      this._game.userPoints++;

    } else if (stateWinner === -1) {
      this._game.autoPoints++;
    }

    if (this._game.round === this._game.maxRound) {

      const isTie = (this._game.autoPoints === this._game.userPoints);

      if (isTie) {
        this._game.maxRound++;
        this._router.navigate(['/selection', this._game.mode]);

      } else {
        this._notificationGameOver.next((this._game.userPoints > this._game.autoPoints));
        this.resetGame();
      }
    } else {
      this._router.navigate(['/selection', this._game.mode]);
    }

  }

  public resetGame(): void {
    this._game = {
      options: [],
      mode: 'normal',
      round: 0,
      winner: 0,
      userPoints: 0,
      autoPoints: 0,
      maxRound: 3 
    };

    this._router.navigate(['']);
    this._notificationResetGame.next();
  }

  public playGame(type: GameType): void {
    this._router.navigate(['/selection', type]);
  }
}

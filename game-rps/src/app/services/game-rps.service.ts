import { GameType } from './../types/game-type.type';
import { Injectable } from '@angular/core';
import { GameOption } from '../types/game-option.type';
import { OPTIONS_NORMAL } from '../global/options.global';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

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
  }

  public setGameOptions(): void {
    if (this._game.mode === 'normal') {
      this._game.options = [...OPTIONS_NORMAL];

    } else {
      this._game.options = [];
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

  public calculateChoicePlayerAuto(): GameOption {

    console.log('calculateChoicePlayerAuto', this._game);

    if (this._game.mode === 'normal') {
      return this._game.options[Math.floor(Math.random() * 3)];
    } else {
      console.log('paper');
      return 'paper';
    }
  }

  public verifyGameWinner(optionPlayer: GameOption | null, optionPlayerAuto: GameOption): number {
    if (this._game.mode === 'normal') {

      if (optionPlayer === optionPlayerAuto) {
        
        return 0;
      
      } else {
        
        if (optionPlayer === 'paper') {

          return (optionPlayerAuto === 'rock') ? 1 : -1;
    
        } else if (optionPlayer === 'rock') {
    
          return (optionPlayerAuto === 'paper') ? 1 : -1;
    
        } else if (optionPlayer === 'scissor') {
    
          return (optionPlayerAuto === 'paper') ? 1 : -1;
    
        } else {

          return 1;
        }
      }

    } else {
      
      return -1
    }
  }

  public nextRound(stateWinner: number): void {

    console.log('nextRound', stateWinner);
    this._game.round++;

    if (stateWinner === 1) {
      console.log('use point ++');
      this._game.userPoints++;

    } else if (stateWinner === -1) {
      console.log('auto point ++');
      this._game.autoPoints++;
    }

    console.log(this._game.round);


    if (this._game.round === this._game.maxRound) {

      console.log('TERMINO LOS TURNOS...');

      const isTie = (this._game.autoPoints === this._game.userPoints);

      if (isTie) {
        this._game.maxRound++;
        this._router.navigate(['/selection', this._game.mode]);

      } else {

        if (this._game.autoPoints > this._game.userPoints) {
          console.log("WIN PC");
        } else {
          console.log("WIN USER");
        }

        console.log('GAME OVER');
        this.resetGame();
      }
    } else {
      console.log('next round..');
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

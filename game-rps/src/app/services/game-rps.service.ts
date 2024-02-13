import { GameType } from './../types/game-type.type';
import { Injectable } from '@angular/core';
import { GameOption } from '../types/game-option.type';
import { OPTIONS_NORMAL } from '../global/options.global';

@Injectable({
  providedIn: 'root'
})
export class GameRpsService {

  private _game: {
    options: Array<GameOption>,
    mode: GameType,
    round: number,
    winner: number
  };

  constructor() {
    this._game = {
      options: [],
      mode: 'normal',
      round: 0,
      winner: 0
    };
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
}

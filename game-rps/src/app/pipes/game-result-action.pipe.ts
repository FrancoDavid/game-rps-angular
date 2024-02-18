import { Pipe, type PipeTransform } from '@angular/core';
import { GameOption } from '../types/game-option.type';

@Pipe({
  name: 'gameResultAction',
  standalone: true,
})
export class GameResultActionPipe implements PipeTransform {

  transform(picked: GameOption | null, pcPicked: GameOption | null): string {
    
    if (picked === 'scissor' && pcPicked === 'paper') {
      return 'Scissors cuts Paper';
    
    } else if (picked === 'paper' && pcPicked === 'rock') {
      return 'Paper covers Rock';
    
    } else if (picked === 'rock' && pcPicked === 'lizard') {
      return 'Rock crushes Lizard';
    
    } else if (picked === 'lizard' && pcPicked === 'spock') {
      return 'Lizard poisons Spock';
    
    } else if (picked === 'spock' && pcPicked === 'scissor') {
      return 'Spock smashes Scissors';
    
    } else if (picked === 'scissor' && pcPicked === 'lizard') {
      return 'Scissors decapitates Lizard';
    
    } else if (picked === 'lizard' && pcPicked === 'paper') {
      return 'Lizard eats Paper';
    
    } else if (picked === 'paper' && pcPicked === 'spock') {
      return 'Paper disproves Spock';
    
    } else if (picked === 'spock' && pcPicked === 'rock') {
      return 'Spock vaporizes Rock';
    
    } else if (picked === 'rock' && pcPicked === 'scissor') {
      return 'Rock crushes Scissors';
    
    } else {
      return '';

    }
  }


}

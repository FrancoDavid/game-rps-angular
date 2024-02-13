import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameResultText',
  standalone: true,
})
export class GameResultTextPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case -1: 
        return 'YOU LOSE';
      case 0: 
        return 'ITS A TIE';
      case 1:
        return 'You win';
      default:
        return '';
    }
  }

}

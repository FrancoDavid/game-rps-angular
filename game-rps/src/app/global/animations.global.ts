import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

export const fadeDown = trigger('fadeInDown', [
    state('void', style({ opacity: 0, transform: 'translate3d(0, -100%, 0)' })),
    transition('void => *', [
      animate('1s ease')
    ])
]);

export const fadeIn = trigger('fadeIn', [
    state('void', style({ opacity: 0 })),
    transition('void => *', [
      animate('1s ease')
    ])
]);

export const backInDown = trigger('backInDown', [
    transition(':enter', [
      animate('0.75s', keyframes([
        style({ opacity: 0, transform: 'translateY(-120px)', offset: 0 }),
        style({ opacity: 1, transform: 'translateY(20px)', offset: 0.8 }),
        style({ transform: 'translateY(0)', offset: 1 })
      ]))
    ])
]);
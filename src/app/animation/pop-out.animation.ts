export enum popOutState {
    INITIAL = "initial",
    FINAL = "final"
}

import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';

export const popOut = trigger('popOut', [
    state(popOutState.INITIAL, style({
      transform: 'scale(1)'
    })),
    state(popOutState.FINAL, style({
      transform: 'scale(1)'
    })),
    transition('initial <=> final', [
      animate(400, style({transform: 'scale(2.5)'})),
      animate(200, style({transform: 'scale(1.25)'})),
      animate(400, style({transform: 'scale(2)'})),
      animate(200, style({transform: 'scale(1.25)'})),
      animate(400, style({transform: 'scale(1.5)'}))
    ])
  ]
);
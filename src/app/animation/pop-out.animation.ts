import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';

export const popOut = trigger('popOut', 
    [
        
    ]);

export enum popOutState {
    NORMAL = "normal",
    POPPED = "popped"
}
import { createReducer, on } from '@ngrx/store';
import { toggleBtn } from './ui.actions';

export const initialStateUi = { button: { enabled: true } };

export const uiReducer = createReducer(
  initialStateUi,
  on(toggleBtn, (state, action) => ({ button: { enabled: action.enabled } }))
);

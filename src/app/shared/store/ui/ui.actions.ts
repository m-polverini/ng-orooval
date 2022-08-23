import { createAction, props } from '@ngrx/store';

export const toggleBtn = createAction(
  `[UI - Button] Toggle button`,
  props<{ enabled: boolean }>()
);

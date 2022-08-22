import { createAction, props } from '@ngrx/store';
import { ToastInfo } from '../../models';

export const showToast = createAction(
  `[Toast] Show toast`,
  props<{ info: ToastInfo }>()
);

export const removeToast = createAction(
  `[Toast] Remove toast`,
  props<{ info: ToastInfo }>()
);

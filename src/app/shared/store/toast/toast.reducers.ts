import { createReducer, on } from '@ngrx/store';
import { ToastInfo } from '../../models';
import { removeToast, showToast } from './toast.actions';

export const initialState: ToastInfo[] = [];

export const toastReducer = createReducer(
  initialState,
  on(showToast, (state, action) => [...state, action.info]),
  on(removeToast, (state, action) =>
    state.filter((toast) => toast !== action.info)
  )
);

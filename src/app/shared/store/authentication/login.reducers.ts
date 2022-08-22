import { createReducer, on } from '@ngrx/store';
import { loginFailed, loginSuccess } from './login.actions';

export const initialState = {};

export const loginReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => ({
    user: action.auth.user,
    accessToken: action.auth.accessToken,
  })),
  on(loginFailed, (state, action) => ({ error: action.error }))
);

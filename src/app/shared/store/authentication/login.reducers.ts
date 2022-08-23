import { createReducer, on } from '@ngrx/store';
import { loginFailed, loginSuccess } from './login.actions';

export const initialStateLogin = {};

export const loginReducer = createReducer(
  initialStateLogin,
  on(loginSuccess, (state, action) => ({
    user: action.auth.user,
    accessToken: action.auth.accessToken,
  })),
  on(loginFailed, (state, action) => ({
    user: undefined,
    accessToken: undefined,
    error: action.error,
  }))
);

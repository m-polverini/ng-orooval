import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Auth } from '../../models';

export const getAuth = createFeatureSelector<Auth>('auth');

export const getUser = createSelector(getAuth, (auth) => auth.user);
export const getAccessToken = createSelector(
  getAuth,
  (auth) => auth.accessToken
);

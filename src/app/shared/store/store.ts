import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { LoginEffects, loginReducer } from './authentication';
import { toastReducer } from './toast';
import { uiReducer } from './ui';

export const reducers = {
  auth: loginReducer,
  toasts: toastReducer,
  ui: uiReducer,
};

export const effects = [LoginEffects];

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [{ auth: ['user', 'accessToken'] }],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];

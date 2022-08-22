import { LoginEffects, loginReducer } from './authentication';
import { toastReducer } from './toast';

export const reducers = {
  auth: loginReducer,
  toasts: toastReducer,
};

export const effects = [LoginEffects];

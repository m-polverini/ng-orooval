import { Auth } from './auth';
import { ToastInfo } from './toast-info';
import { UiState } from './ui-state';

export interface AppState {
  auth: Auth;
  toasts: ToastInfo[];
  ui: UiState;
}

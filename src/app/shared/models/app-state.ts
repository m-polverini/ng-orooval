import { Auth } from './auth';
import { ToastInfo } from './toast-info';

export interface AppState {
  auth: Auth;
  toasts: ToastInfo[];
}

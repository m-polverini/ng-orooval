import { ToastType } from './toast-type';

export interface ToastInfo {
  body: string;
  delay?: number;
  type?: ToastType;
}

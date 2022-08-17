import { ToastType } from './toast-type.enum';

export interface ToastInfo {
  body: string;
  delay?: number;
  type?: ToastType;
}

import { createFeatureSelector } from '@ngrx/store';
import { ToastInfo } from '../../models';

export const getToasts = createFeatureSelector<ToastInfo[]>('toasts');

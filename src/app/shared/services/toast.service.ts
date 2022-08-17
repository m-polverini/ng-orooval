import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastInfo } from '../models/toast-info';
import { ToastType } from '../models/toast-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: ToastInfo[] = [];
  private _toasts: BehaviorSubject<ToastInfo[]> = new BehaviorSubject<
    ToastInfo[]
  >(this.toasts);
  $toasts = this._toasts.asObservable();

  constructor() {}

  show(body: string, type?: ToastType, delay?: number) {
    this.toasts.push({ body, delay, type: type || ToastType.DEFAULT });
    this._toasts.next(this.toasts);
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter((t) => t != toast);
    this._toasts.next(this.toasts);
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastInfo, ToastType } from '../../models';
import { ToastService } from '../../services';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  DEFAULT: ToastType = ToastType.DEFAULT;
  ERROR: ToastType = ToastType.ERROR;
  SUCCESS: ToastType = ToastType.SUCCESS;
  WARNING: ToastType = ToastType.WARNING;

  toasts$: Observable<ToastInfo[]>;

  constructor(private _toastService: ToastService) {
    this.toasts$ = this._toastService.$toasts;
  }

  removeToast(toast: ToastInfo) {
    this._toastService.remove(toast);
  }

  getHeader(type?: ToastType) {
    switch (type) {
      case this.DEFAULT:
        return 'Info';
      case this.ERROR:
        return 'Errore';
      case this.SUCCESS:
        return 'Successo';
      case this.WARNING:
        return 'Attenzione';
    }
    return 'Info';
  }

  ngOnInit(): void {}
}

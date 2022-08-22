import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToastInfo, ToastType } from '../../models';
import { ToastService } from '../../services';
import { getToasts, removeToast } from '../../store/toast';

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

  constructor(private store: Store) {
    this.toasts$ = this.store.select(getToasts);
  }

  removeToast(toast: ToastInfo) {
    this.store.dispatch(removeToast({ info: toast }));
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

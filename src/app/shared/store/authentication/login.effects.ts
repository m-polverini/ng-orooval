import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, finalize } from 'rxjs/operators';
import { ToastType } from '../../models';
import { AuthService } from '../../services';
import { showToast } from '../toast';
import { toggleBtn } from '../ui';
import { login, loginFailed, loginSuccess } from './login.actions';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((state) =>
        this.authService.login(state.credentials).pipe(
          map((auth) => {
            return loginSuccess({ auth });
          }),
          catchError((error) => {
            this.store.dispatch(
              showToast({
                info: { body: error.error.error, type: ToastType.ERROR },
              })
            );
            return of(loginFailed({ error: error.error.error }));
          }),
          finalize(() => this.store.dispatch(toggleBtn({ enabled: true })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}
}

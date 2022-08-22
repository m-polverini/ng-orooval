import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ToastType } from '../../models';
import { AuthService } from '../../services';
import { showToast } from '../toast';
import { login, loginFailed, loginSuccess } from './login.actions';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((state) =>
        this.authService.login(state.credentials).pipe(
          map((auth) => loginSuccess({ auth })),
          catchError((error) =>
            of(
              showToast({
                info: { body: error.error.error, type: ToastType.ERROR },
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}

import { createAction, props } from '@ngrx/store';
import { UserLogin, Auth } from 'src/app/shared';

export const login = createAction(
  `[Login] Do login`,
  props<{ credentials: UserLogin }>()
);

export const loginSuccess = createAction(
  `[Login] Login success`,
  props<{ auth: Auth }>()
);

export const loginFailed = createAction(
  `[Login] Login failed`,
  props<{ error: string }>()
);

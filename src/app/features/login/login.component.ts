import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { login, User, UserLogin } from 'src/app/shared';
import { isBtnEnabled, toggleBtn } from 'src/app/shared/store/ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  showPassword: boolean;

  loginSub?: Subscription;
  isBtnEnabled$: Observable<boolean>;

  constructor(private _fb: FormBuilder, private store: Store<{ user: User }>) {
    this.loginForm = this._fb.group({
      email: this._fb.control('prova2113433@me.it', [
        Validators.email,
        Validators.required,
      ]),
      password: this._fb.control('password', [Validators.required]),
    });
    this.showPassword = false;
    this.isBtnEnabled$ = this.store.select(isBtnEnabled);
  }

  ngOnDestroy(): void {
    if (this.loginSub) this.loginSub.unsubscribe();
  }

  ngOnInit(): void {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    const user: UserLogin = this.loginForm.value;
    this.store.dispatch(toggleBtn({ enabled: false }));
    this.store.dispatch(login({ credentials: user }));
  }

  get email(): AbstractControl<any, any> | null {
    return this.loginForm.get('email');
  }
  get password(): AbstractControl<any, any> | null {
    return this.loginForm.get('password');
  }
}

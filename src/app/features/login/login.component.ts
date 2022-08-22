import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService, UserLogin } from 'src/app/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  showPassword: boolean;

  loginSub?: Subscription;

  constructor(private _fb: FormBuilder, private _authService: AuthService) {
    this.loginForm = this._fb.group({
      email: this._fb.control('prova2113433@me.it', [
        Validators.email,
        Validators.required,
      ]),
      password: this._fb.control('password', [Validators.required]),
    });
    this.showPassword = false;
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
    this.loginSub = this._authService.login(user).subscribe((result) => {
      console.log(result);
    });
  }

  get email(): AbstractControl<any, any> | null {
    return this.loginForm.get('email');
  }
  get password(): AbstractControl<any, any> | null {
    return this.loginForm.get('password');
  }
}

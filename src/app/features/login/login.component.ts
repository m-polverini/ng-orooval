import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserLogin } from '../../shared/models/user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _cookieService: CookieService
  ) {
    this.loginForm = this._fb.group({
      email: this._fb.control(null, [Validators.email, Validators.required]),
      password: this._fb.control(null, [Validators.required]),
    });
    this.showPassword = false;
  }

  ngOnInit(): void {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    const user: UserLogin = this.loginForm.value;
    this._authService.login(user).subscribe((result) => {
      console.log(result);
      console.log(this._cookieService.getAll());
    });
  }

  get email(): AbstractControl<any, any> | null {
    return this.loginForm.get('email');
  }
  get password(): AbstractControl<any, any> | null {
    return this.loginForm.get('password');
  }
}

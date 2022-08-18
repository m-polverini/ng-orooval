import { environment } from './../../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user-login';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ToastService } from './toast.service';
import { ToastType } from '../models/toast-type.enum';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string;
  service: string = '/auth';
  constructor(
    private _http: HttpClient,
    private _toastService: ToastService,
    private _cookieService: CookieService
  ) {
    this.apiUrl = environment.api;
  }

  login(user: UserLogin): Observable<User> {
    return this._http
      .post<Response>(`${this.apiUrl}${this.service}/login`, user)
      .pipe(
        map((response: Response) => {
          console.log(this._cookieService.getAll());
          console.log(response.response.access_token);
          return response.response.user;
        }),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  refresh(): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}${this.service}/refresh`, {});
  }

  private handleError(error: HttpErrorResponse) {
    this._toastService.show(error.error.error, ToastType.ERROR);
    return throwError(() => error);
  }
}

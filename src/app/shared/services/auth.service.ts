import { environment } from './../../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user-login';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
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

  login(user: UserLogin): Observable<any> {
    return this._http
      .post<Response>(`${this.apiUrl}${this.service}/login`, user, {
        withCredentials: true,
      })
      .pipe(
        map((response: Response) => {
          console.log(this._cookieService.getAll());
          return response.response;
        }),
        switchMap((result) =>
          this._http.post(
            `${this.apiUrl}${this.service}/refresh`,
            {},
            {
              withCredentials: true,
            }
          )
        ),
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

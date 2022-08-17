import { environment } from './../../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user-login';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { ToastService } from './toast.service';
import { ToastType } from '../models/toast-type.enum';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string;
  service: string = '/auth';
  constructor(private _http: HttpClient, private _toastService: ToastService) {
    this.apiUrl = environment.api;
  }

  login(user: UserLogin): Observable<any> {
    return this._http
      .post(`${this.apiUrl}${this.service}/login`, user, {})
      .pipe(
        // switchMap((result) => {
        //   const auth = result.headers.get('authorization');
        //   if (auth) {
        //     let headers = new HttpHeaders({ Authorization: auth });
        //     const res = <Response>result.body;

        //     return this._http.get(`${this.apiUrl}/user/${res.response.id}`, {
        //       headers: headers,
        //     });
        //   }
        //   return of(null);
        // }),
        catchError((error: HttpErrorResponse) => {
          this._toastService.show(error.error.error, ToastType.ERROR);
          return throwError(() => error);
        })
      );
  }
}

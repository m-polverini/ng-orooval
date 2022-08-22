import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response, ToastType, User, UserLogin } from '../models';
import { Auth } from '../models/auth';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string;
  service: string = '/auth';

  AUTHORIZATION = 'Authorization';
  constructor(private _http: HttpClient, private _toastService: ToastService) {
    this.apiUrl = environment.api;
  }

  login(user: UserLogin): Observable<Auth> {
    return this._http
      .post<Response>(`${this.apiUrl}${this.service}/login`, user, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          return {
            user: response.body?.response,
            accessToken: response.headers.get(this.AUTHORIZATION),
          };
        }),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  refresh(): Observable<User> {
    return this._http
      .post<Response>(
        `${this.apiUrl}${this.service}/refresh`,
        {},
        { withCredentials: true, observe: 'response' }
      )
      .pipe(
        map((response) => {
          this.saveAccessTokenAndUser(
            response.headers.get(this.AUTHORIZATION),
            response.body?.response
          );
          return response.body?.response;
        }),
        catchError((error) => this.handleError(error))
      );
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.AUTHORIZATION);
  }

  getUser(): User | null {
    const user: string | null = localStorage.getItem('user');
    if (user) return JSON.parse(user);
    return null;
  }

  saveAccessTokenAndUser(token: string | null, user: User): void {
    if (token) localStorage.setItem(this.AUTHORIZATION, token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.AUTHORIZATION);
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.AUTHORIZATION) ? true : false;
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}

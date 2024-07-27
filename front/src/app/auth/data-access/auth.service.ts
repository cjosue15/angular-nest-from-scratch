import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../shared/data-access/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);
  private _storage = inject(StorageService);

  signUp(email: string, password: string): Observable<any> {
    return this._http
      .post(`${environment.API_URL}/auth/sign-up`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this._storage.set('session', JSON.stringify(response));
        })
      );
  }

  logIn(email: string, password: string): Observable<any> {
    return this._http
      .post(`${environment.API_URL}/auth/log-in`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this._storage.set('session', JSON.stringify(response));
        })
      );
  }
}

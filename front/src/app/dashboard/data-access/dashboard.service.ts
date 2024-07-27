import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface User {
  id: string;
  email: string;
}

interface UserResponse {
  id: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private _http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this._http.get<UserResponse[]>(`${environment.API_URL}/users`).pipe(
      map((response) => {
        return response.map((user) => ({ id: user.id, email: user.email }));
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.socketUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  login(loginData: { email: string; password: string }): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login`, loginData);
  }

  register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, {
      email,
      password,
    });
  }
}

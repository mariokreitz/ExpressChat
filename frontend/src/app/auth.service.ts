import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "./app.config";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly API_URI = `${environment.socketUrl}/api/auth`;
  private readonly USER_DATA_KEY = "userData";

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<{ token: string; user: any }> {
    return this.http.post<{ token: string; user: any }>(`${this.API_URI}/login`, credentials);
  }

  register(credentials: { username: string; email: string; password: string }): Observable<void> {
    return this.http.post<void>(`${this.API_URI}/register`, credentials);
  }

  logout(): void {
    this.clearUserData();
  }

  setUserData(data: any): void {
    sessionStorage.setItem(this.USER_DATA_KEY, JSON.stringify(data));
  }

  getUserData(): any {
    const storedData = sessionStorage.getItem(this.USER_DATA_KEY);
    return storedData ? JSON.parse(storedData) : null;
  }

  clearUserData(): void {
    sessionStorage.removeItem(this.USER_DATA_KEY);
    sessionStorage.removeItem("authToken");
  }
}

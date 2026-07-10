import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAPIResponse, LoginAPIUser } from '@app/models/loginAPI.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly router = inject(Router);
  private readonly _accessToken = signal<string | null>(localStorage.getItem('accessToken'));
  private readonly _refreshToken = signal<string | null>(localStorage.getItem('refreshToken'));
  private readonly _user = signal<LoginAPIUser | null>(this.loadUserFromStorage());


  readonly accessToken = this._accessToken.asReadonly();
  readonly refreshToken = this._refreshToken.asReadonly();
  readonly user = this._user.asReadonly();

  readonly isAuthenticated = computed(() => this._accessToken() !== null);

  constructor() {
    effect(() => {
      const token = this._accessToken();
      if (token) {
        localStorage.setItem('accessToken', token);
      } else {
        localStorage.removeItem('accessToken');
      }
    });

    effect(() => {
      const token = this._refreshToken();
      if (token) {
        localStorage.setItem('refreshToken', token);
      } else {
        localStorage.removeItem('refreshToken');
      }
    });

    effect(() => {
      const user = this._user();
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  setSession(response: LoginAPIResponse): void {
    this._accessToken.set(response.accessToken);
    this._refreshToken.set(response.refreshToken);
    this._user.set(this.toStoredUser(response));
  }

  logout(): void {
    this._accessToken.set(null);
    this._refreshToken.set(null);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  private loadUserFromStorage(): LoginAPIUser | null {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }

  private toStoredUser(response: LoginAPIResponse): LoginAPIUser {
    const { id, username, email, firstName, lastName, gender, image, roles } = response;
    return { id, username, email, firstName, lastName, gender, image, roles };
  }

}

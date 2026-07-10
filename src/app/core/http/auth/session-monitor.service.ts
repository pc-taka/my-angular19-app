import { effect, inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionMonitorService {

  private readonly authService = inject(AuthService);
  private logoutTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.scheduleAutoLogout();
      }else{
        this.clearAutoLogout();
      }
    });
  }

  private getTokenExpiry(token: string | null): number | null {
    try {
      if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? payload.exp * 1000 : null; // ms
    } catch {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const token = this.authService.accessToken();
    if (!token) return true;
    const exp = this.getTokenExpiry(token);
    return exp ? Date.now() >= exp : false;
  }

  scheduleAutoLogout(): void {
    clearTimeout(this.logoutTimer);
    const token = this.authService.accessToken();
    if (!token) return;

    const exp = this.getTokenExpiry(token);
    if (!exp) return;

    const msUntilExpiry = exp - Date.now();
    if (msUntilExpiry <= 0) {
      this.authService.logout();
      return;
    }
    this.logoutTimer = setTimeout(() => this.authService.logout(), msUntilExpiry);
  }

  clearAutoLogout(): void {
    clearTimeout(this.logoutTimer);
  }

}

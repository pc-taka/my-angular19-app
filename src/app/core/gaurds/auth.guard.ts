import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../http/auth/auth.service';
import { Router } from '@angular/router';
import { SessionMonitorService } from '../http/auth/session-monitor.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const sessionMonitorService = inject(SessionMonitorService);
  if (authService.isAuthenticated() && !sessionMonitorService.isTokenExpired()) {
    return true;
  }
  authService.logout();
  return false;
};

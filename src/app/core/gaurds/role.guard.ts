import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../http/auth/auth.service';
import { Role } from '@app/role.model';
import { SessionMonitorService } from '../http/auth/session-monitor.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const sessionMonitorService = inject(SessionMonitorService);
  const router = inject(Router);
  if(route.data['role'].includes(authService.user()?.roles?.[0] as Role)) {
    return true;
  } else {
    if(authService.isAuthenticated() && !sessionMonitorService.isTokenExpired()) {
      router.navigate(['/access-denied']);
    }else{
      router.navigate(['/login']);
    }
    return false;
  }
};

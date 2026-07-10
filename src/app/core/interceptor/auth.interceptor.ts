import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../http/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if(authService.accessToken() && authService.user()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.accessToken()}`
      }
    });
  }
  return next(req);
};

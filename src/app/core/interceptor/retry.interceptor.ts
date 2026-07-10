import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../http/auth/auth.service';
import { retry } from 'rxjs';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if(authService.accessToken() && authService.user()) {
    return next(req).pipe(
      retry(3)
    );
  }
  return next(req);
};

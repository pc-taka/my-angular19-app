import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/http/api/api.service';
import { LoginAPIRequest, LoginAPIResponse } from '@app/models/loginAPI.model';
import { AuthService } from '../../core/http/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiService = inject(ApiService);
  private readonly authService = inject(AuthService);

  public login(username: string, password: string): Observable<LoginAPIResponse> {
    const body: LoginAPIRequest = { username, password, expiresInMins: 1 };
    return this.apiService.post<LoginAPIResponse>('/auth/login', body);
  }

  public setSession(response: LoginAPIResponse): void {
    this.authService.setSession(response);
  }


        
}

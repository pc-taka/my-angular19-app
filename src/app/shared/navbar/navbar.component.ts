import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/http/auth/auth.service';
import { SessionMonitorService } from '../../core/http/auth/session-monitor.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  private readonly authService = inject(AuthService);
  public isAuthenticated = this.authService.isAuthenticated;
  private readonly sessionMonitorService = inject(SessionMonitorService);
  public isTokenExpired = () => this.sessionMonitorService.isTokenExpired();
  public logout = () => this.authService.logout();

}

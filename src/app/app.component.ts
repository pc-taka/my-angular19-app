import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SessionMonitorService } from './core/http/auth/session-monitor.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'my-angular19-app';

  private readonly sessionMonitorService = inject(SessionMonitorService);
  
  ngOnInit(): void {
    this.sessionMonitorService.scheduleAutoLogout();
  }
  
}

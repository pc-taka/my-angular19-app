import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoginFormControls, LoginFormModel } from '../../shared/models/forms/loginForm.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule],
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  private readonly fb = inject(FormBuilder);
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  public loginForm: LoginFormModel = this.fb.nonNullable.group<LoginFormControls>({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
  });

  public onSubmit(): void {
    const { email, password } = this.loginForm.value;
    if (!email || !password) {
      return;
    }
    this.loginService.login(email, password).pipe(take(1)).subscribe({
      next: (response) => {
        response.roles = ['admin'];
        this.snackBar.open('Login successful', 'Close', { duration: 3000 });
        this.loginService.setSession(response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open('Invalid email or password', 'Close', { duration: 3000 });
      }
    });;
  }
}

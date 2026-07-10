import { Routes } from '@angular/router';
import { roleGuard } from './core/gaurds/role.guard';
import { authGuard } from './core/gaurds/auth.guard';
import { ROLES, Role } from './shared/models/auth/role.model';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'page1',
        loadComponent: () => import('./features/page1/page1.component').then(m => m.Page1Component)
    },
    {
        path: 'page2',
        loadComponent: () => import('./features/page2/page2.component').then(m => m.Page2Component)
    },
    {
        path: 'dashboard',
        canActivate: [authGuard, roleGuard],
        data: { role: [ROLES.find(role => role === 'user') as Role, ROLES.find(role => role === 'admin') as Role] },
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'admin',
        canActivate: [authGuard, roleGuard],
        data: { role: [ROLES.find(role => role === 'admin') as Role] },
        loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent)
    },
    {
        path: 'access-denied',
        loadComponent: () => import('./features/access-denied/access-denied.component').then(m => m.AccessDeniedComponent)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

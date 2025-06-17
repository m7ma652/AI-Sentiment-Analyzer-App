import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/home.component').then(p => p.HomeComponent), canActivate: [authGuard] },
    { path: 'analyze', loadComponent: () => import('./analyze/analyze.component').then(p => p.AnalyzeComponent), canActivate: [authGuard] },
    // { path: 'profile', loadComponent: () => import('./profile/profile.component').then(p => p.ProfileComponent), canActivate: [authGuard] },
    // { path: 'chatbot', loadComponent: () => import('./chatbot/chatbot.component').then(p => p.ChatbotComponent), canActivate: [authGuard] },
    { path: 'login', loadComponent: () => import('./login/login.component').then(p => p.LoginComponent) },
    { path: 'register', loadComponent: () => import('./register/register.component').then(p => p.RegisterComponent) },
    { path: '**', loadComponent: () => import('./notfound/notfound.component').then(p => p.NotfoundComponent) },
];

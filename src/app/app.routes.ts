import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',loadComponent:()=>import('./home/home.component').then(p=>p.HomeComponent)},
    {path:'login',loadComponent:()=>import('./login/login.component').then(p=>p.LoginComponent)},
    {path:'analyze',loadComponent:()=>import('./analyze/analyze.component').then(p=>p.AnalyzeComponent)},
    {path:'profile',loadComponent:()=>import('./profile/profile.component').then(p=>p.ProfileComponent)},
];
